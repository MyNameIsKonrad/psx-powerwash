import { config } from './config';
import { stream, applyThrowEdgeSnap } from './stream';

// Pointer input: grab → drag → release. Drag is 1:1 with grab offset preserved
// so the stream never visually jumps under the finger. On release we compute
// throw velocity over a sliding window — this is what makes flicks feel right.

let held = false;
let grabOffsetX = 0;
let grabOffsetY = 0;
let getW = () => 0;
let getH = () => 0;

// Top-left corner is reserved as a tap zone (e.g. toggle the tuning GUI on
// mobile so it isn't always covering the play area). Taps here do not grab.
const CORNER_SIZE = 80;
let cornerTapHandler: (() => void) | null = null;
export function onCornerTap(fn: () => void) { cornerTapHandler = fn; }

// Allow other modules to suspend grab/throw entirely (end screen, upgrade UI).
let inputEnabled = true;
export function setInputEnabled(v: boolean) {
  inputEnabled = v;
  if (!v) held = false;
}

interface Sample { x: number; y: number; t: number }
const samples: Sample[] = [];

export function isHeld() { return held; }

function clampToPlayArea() {
  const pad = config.stream.eraseRadius * 0.5;
  const W = getW(), H = getH();
  if (stream.x < pad)     stream.x = pad;
  if (stream.x > W - pad) stream.x = W - pad;
  if (stream.y < pad)     stream.y = pad;
  if (stream.y > H - pad) stream.y = H - pad;
}

function onDown(x: number, y: number) {
  if (x < CORNER_SIZE && y < CORNER_SIZE && cornerTapHandler) {
    cornerTapHandler();
    return;
  }
  if (!inputEnabled) return;
  held = true;
  grabOffsetX = stream.x - x;
  grabOffsetY = stream.y - y;
  samples.length = 0;
  samples.push({ x, y, t: performance.now() });
}

function onMove(x: number, y: number) {
  if (!held) return;
  stream.x = x + grabOffsetX;
  stream.y = y + grabOffsetY;
  clampToPlayArea();
  samples.push({ x, y, t: performance.now() });
  // Trim samples older than the velocity window (+small margin).
  const cutoff = performance.now() - config.stream.velWindowMs - 20;
  while (samples.length > 1 && samples[0].t < cutoff) samples.shift();
}

function onUp() {
  if (!held) return;
  held = false;

  const tNow = performance.now();
  const cutoff = tNow - config.stream.velWindowMs;
  let oldest = samples[0];
  for (const s of samples) { if (s.t >= cutoff) { oldest = s; break; } }
  const newest = samples[samples.length - 1];

  let vx = 0, vy = 0;
  if (oldest && newest && newest.t > oldest.t) {
    const dt = (newest.t - oldest.t) / 1000;
    vx = (newest.x - oldest.x) / dt;
    vy = (newest.y - oldest.y) / dt;
  }
  const sp = Math.hypot(vx, vy);
  if (sp > config.stream.maxThrowSpeed) {
    vx = (vx / sp) * config.stream.maxThrowSpeed;
    vy = (vy / sp) * config.stream.maxThrowSpeed;
  }

  if (sp < config.stream.minThrowSpeed) {
    // Tap-with-no-throw: nudge in a random direction so the stream doesn't sit still.
    const a = Math.random() * Math.PI * 2;
    stream.vx = Math.cos(a) * config.stream.freeSpeed;
    stream.vy = Math.sin(a) * config.stream.freeSpeed;
  } else {
    const W = getW(), H = getH();
    const snapped = applyThrowEdgeSnap(vx, vy, W, H);
    stream.vx = snapped.vx;
    stream.vy = snapped.vy;
  }

  samples.length = 0;
}

export function setupInput(
  canvas: HTMLCanvasElement,
  getWidth: () => number,
  getHeight: () => number,
) {
  getW = getWidth;
  getH = getHeight;

  canvas.addEventListener('touchstart', (e) => { e.preventDefault(); const t = e.touches[0]; onDown(t.clientX, t.clientY); }, { passive: false });
  canvas.addEventListener('touchmove',  (e) => { e.preventDefault(); const t = e.touches[0]; onMove(t.clientX, t.clientY); }, { passive: false });
  canvas.addEventListener('touchend',   (e) => { e.preventDefault(); onUp(); }, { passive: false });
  canvas.addEventListener('touchcancel',(e) => { e.preventDefault(); onUp(); }, { passive: false });
  canvas.addEventListener('mousedown',  (e) => onDown(e.clientX, e.clientY));
  window.addEventListener('mousemove',  (e) => onMove(e.clientX, e.clientY));
  window.addEventListener('mouseup',    onUp);
}
