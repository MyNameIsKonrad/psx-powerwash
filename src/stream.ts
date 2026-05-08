import { config } from './config';
import { effective } from './effective';
import { keyDir, isThrusting } from './keyboard';
import { gamepadStick } from './gamepad';

// Resolve an analog thrust intent from any input modality. Magnitude is 0..1
// so e.g. half-stick produces half acceleration. Keyboard always produces
// magnitude 1 (binary). Returns null if no thrust input is active.
function thrustIntent(): { x: number; y: number; mag: number } | null {
  if (isThrusting()) {
    const d = keyDir();
    const len = Math.hypot(d.x, d.y) || 1;
    return { x: d.x / len, y: d.y / len, mag: 1 };
  }
  const s = gamepadStick();
  if (s) return { x: s.x, y: s.y, mag: s.mag };
  return null;
}

export interface Stream {
  x: number; y: number;
  vx: number; vy: number;
}

export const stream: Stream = { x: 0, y: 0, vx: 0, vy: 0 };

export function resetStream(W: number, H: number) {
  stream.x = W / 2;
  stream.y = H / 2;
  const a = Math.random() * Math.PI * 2;
  stream.vx = Math.cos(a) * effective.freeSpeed;
  stream.vy = Math.sin(a) * effective.freeSpeed;
}

// Free-flight integration with DVD-bounce off all four walls. When held
// (dragging), the input module sets stream.x/y directly and this is skipped.
export function updateStream(
  dt: number, W: number, H: number, held: boolean,
  onBounce: (x: number, y: number) => void,
) {
  if (held) return;

  // Thrust intent (keyboard or gamepad). Applied before integration so it
  // composes with the always-moving free-flight feel rather than overriding
  // it. Same code path for every modality — analog stick just delivers a
  // partial-magnitude version of the same vector keyboard delivers as 1.
  const t = thrustIntent();
  if (t) {
    stream.vx += t.x * config.keyboard.accel * t.mag * dt;
    stream.vy += t.y * config.keyboard.accel * t.mag * dt;
    // Brake the perpendicular component so input direction wins quickly.
    // Perpendicular brake scales with magnitude too — feathering the stick
    // shouldn't aggressively snap perpendicular momentum.
    const perp = stream.vx * -t.y + stream.vy * t.x;
    const k = Math.min(1, config.keyboard.perpBrake * t.mag * dt);
    stream.vx -= -t.y * perp * k;
    stream.vy -=  t.x * perp * k;
    const sp = Math.hypot(stream.vx, stream.vy);
    if (sp > config.keyboard.maxSpeed) {
      stream.vx = stream.vx / sp * config.keyboard.maxSpeed;
      stream.vy = stream.vy / sp * config.keyboard.maxSpeed;
    }
  }

  stream.x += stream.vx * dt;
  stream.y += stream.vy * dt;

  const pad = effective.eraseRadius * 0.5;
  let bounced = false;
  if (stream.x < pad)       { stream.x = pad;       stream.vx =  Math.abs(stream.vx); bounced = true; }
  if (stream.x > W - pad)   { stream.x = W - pad;   stream.vx = -Math.abs(stream.vx); bounced = true; }
  if (stream.y < pad)       { stream.y = pad;       stream.vy =  Math.abs(stream.vy); bounced = true; }
  if (stream.y > H - pad)   { stream.y = H - pad;   stream.vy = -Math.abs(stream.vy); bounced = true; }

  if (bounced) {
    const speed = Math.hypot(stream.vx, stream.vy);
    const angle = Math.atan2(stream.vy, stream.vx)
      + (Math.random() * 2 - 1) * config.stream.bounceNudgeRad;
    stream.vx = Math.cos(angle) * speed;
    stream.vy = Math.sin(angle) * speed;
    onBounce(stream.x, stream.y);
  }
}

// Edge snap on throw release. Tolerance scales with throw speed because fast
// finger flicks have noisier velocity samples — without this, fast throws
// near a wall almost never snap parallel even when the user clearly meant to.
export function applyThrowEdgeSnap(
  vx: number, vy: number, W: number, H: number,
): { vx: number; vy: number } {
  const speed = Math.hypot(vx, vy);
  const min = config.stream.minThrowSpeed;
  const max = config.stream.maxThrowSpeed;
  const speedRatio = Math.max(0, Math.min(1, (speed - min) / (max - min)));
  const snapTan = config.edgeSnap.tan
    + speedRatio * (config.edgeSnap.tanFast - config.edgeSnap.tan);

  const d = config.edgeSnap.dist;
  const nearTop   = stream.y < d;
  const nearBot   = stream.y > H - d;
  const nearLeft  = stream.x < d;
  const nearRight = stream.x > W - d;

  if ((nearTop || nearBot) && Math.abs(vy) < Math.abs(vx) * snapTan) {
    return { vx: Math.sign(vx) * speed, vy: 0 };
  }
  if ((nearLeft || nearRight) && Math.abs(vx) < Math.abs(vy) * snapTan) {
    return { vx: 0, vy: Math.sign(vy) * speed };
  }
  return { vx, vy };
}
