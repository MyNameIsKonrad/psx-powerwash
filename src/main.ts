import { resetStream, updateStream } from './stream';
import { setupInput, isHeld, onCornerTap, setInputEnabled } from './input';
import { initGrid, damageGrid } from './grid';
import { spawnFlyingTile, updateTiles, clearTiles } from './tiles';
import { spawnBounceSplash, updateSplashes, clearSplashes } from './splash';
import { render } from './render';
import { setupGui, toggleGui } from './gui';
import { recomputeEffective } from './effective';
import { startRun, getRun } from './run';
import { setupKeyboard } from './keyboard';
import { setupGamepad, pollGamepad, isGamepadConnected } from './gamepad';
import { config } from './config';

const canvas = document.getElementById('stage') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const resetBtn = document.getElementById('reset') as HTMLButtonElement;
const pauseOverlay = document.getElementById('pauseOverlay') as HTMLDivElement;

// Virtual play space. All gameplay coordinates run in this space; resize
// only changes how it's displayed (letterboxed within the window).
let W = config.display.virtualWidth;
let H = config.display.virtualHeight;
let DPR = 1;
let scale = 1;
let offsetX = 0;
let offsetY = 0;

function resize() {
  const winW = window.innerWidth;
  const winH = window.innerHeight;

  // Pick virtual dimensions based on responsive mode.
  const d = config.display;
  if (d.responsiveMode === 'aspect') {
    if (winW >= winH) {
      d.virtualWidth  = d.referenceWidth;
      d.virtualHeight = d.referenceHeight;
    } else {
      d.virtualWidth  = d.referenceHeight;
      d.virtualHeight = d.referenceWidth;
    }
  } else if (d.responsiveMode === 'continuous') {
    const refShort = Math.min(d.referenceWidth, d.referenceHeight);
    if (winW >= winH) {
      d.virtualHeight = refShort;
      d.virtualWidth  = Math.round(refShort * winW / winH / 16) * 16;
    } else {
      d.virtualWidth  = refShort;
      d.virtualHeight = Math.round(refShort * winH / winW / 16) * 16;
    }
  }
  // 'fixed': virtualWidth/virtualHeight left as-is.

  W = d.virtualWidth;
  H = d.virtualHeight;

  // Recompute scale-dependent effective values before initGrid reads chunkSize.
  recomputeEffective(W, H);

  scale = Math.min(winW / W, winH / H);
  const dispW = W * scale;
  const dispH = H * scale;
  offsetX = (winW - dispW) / 2;
  offsetY = (winH - dispH) / 2;

  // Cap DPR at 2 — beyond that we pay a lot of fill cost for almost no
  // perceptual gain on the chunky aesthetic.
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width  = W * DPR;
  canvas.height = H * DPR;
  canvas.style.width  = dispW + 'px';
  canvas.style.height = dispH + 'px';
  canvas.style.left = offsetX + 'px';
  canvas.style.top  = offsetY + 'px';
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  initGrid(W, H);
  document.documentElement.style.background = config.display.letterbox;
  document.body.style.background = config.display.letterbox;
}

function clientToVirtual(clientX: number, clientY: number) {
  return {
    x: (clientX - offsetX) / scale,
    y: (clientY - offsetY) / scale,
  };
}

function beginNewRun() {
  initGrid(W, H);
  clearTiles();
  clearSplashes();
  resetStream(W, H);
  setInputEnabled(true);
  paused = false;
  pauseOverlay.classList.remove('show');
  startRun(performance.now());
}

let paused = false;
function togglePause() {
  if (getRun().state !== 'playing') return;
  paused = !paused;
  pauseOverlay.classList.toggle('show', paused);
}

setupInput(canvas, () => W, () => H, clientToVirtual);
setupGui(() => W, () => H);
setupKeyboard({ onPause: togglePause, onRestart: beginNewRun });
setupGamepad({ onPause: togglePause, onRestart: beginNewRun, onToggleGui: toggleGui });
onCornerTap(toggleGui);

// Backtick toggles the tuning GUI on desktop — parity with the mobile
// corner-tap, and quicker than reaching for the corner with a mouse.
window.addEventListener('keydown', (e) => {
  if (e.code === 'Backquote' && !e.ctrlKey && !e.metaKey && !e.altKey) {
    e.preventDefault();
    toggleGui();
  }
});

// Pause button — visible on every platform so touch users can pause too.
const pauseBtn = document.getElementById('pauseBtn') as HTMLButtonElement | null;
if (pauseBtn) pauseBtn.addEventListener('click', (e) => { e.stopPropagation(); togglePause(); });

// Adaptive hint text — show only what's available on this device. The
// gamepad branch updates dynamically because controllers can be plugged in
// after page load.
const hintEl = document.getElementById('hint');
const isTouchOnly = matchMedia('(hover: none) and (pointer: coarse)').matches;
function refreshHint() {
  if (!hintEl) return;
  const parts: string[] = [];
  if (isTouchOnly) {
    parts.push('drag to throw', 'top-left to tune');
  } else {
    parts.push('drag to throw', 'WASD/arrows to thrust', 'esc to pause', 'R to restart', '` to tune');
    if (isGamepadConnected()) parts.push('gamepad: stick to thrust, start to pause, Y to restart');
  }
  hintEl.textContent = parts.join(' · ');
}
refreshHint();
window.addEventListener('gamepadconnected', refreshHint);
window.addEventListener('gamepaddisconnected', refreshHint);

// Restart button label parity: only show "· R" hotkey hint where keyboard exists.
if (isTouchOnly) {
  const r = document.getElementById('reset'); if (r) r.textContent = 'restart';
}

resetBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  beginNewRun();
});

let lastT = performance.now();

function loop() {
  const t = performance.now();
  let dt = (t - lastT) / 1000;
  lastT = t;
  if (dt > 0.05) dt = 0.05;

  recomputeEffective(W, H);
  pollGamepad();

  const run = getRun();
  if (run.state === 'playing' && !paused) {
    updateStream(dt, W, H, isHeld(), spawnBounceSplash);
    damageGrid(spawnFlyingTile);
    updateSplashes(dt);
    updateTiles(dt, H);
  }

  render(ctx, W, H);
  requestAnimationFrame(loop);
}

window.addEventListener('resize', () => {
  resize();
  resetStream(W, H);
});
resize();
beginNewRun();
lastT = performance.now();
loop();
