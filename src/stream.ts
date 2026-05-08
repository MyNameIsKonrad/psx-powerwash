import { config } from './config';
import { effective } from './effective';

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
