import { config } from './config';
import { stream } from './stream';

// Splash visual: short-lived rotated rectangles at the stream position. Stiff
// alpha curve (held then snapped) — a smooth fade was tried and felt mushy.
// Normal blend, NOT additive — additive made it feel neon-glowy.

export interface Splash {
  x: number; y: number;
  rot: number;
  age: number;
  sizeMul: number;
}

export const splashes: Splash[] = [];

let timer = 0;

export function spawnSplash(cx: number, cy: number, sizeMul = 1) {
  const r = Math.random() * config.splash.jitter;
  const a = Math.random() * Math.PI * 2;
  splashes.push({
    x: cx + Math.cos(a) * r,
    y: cy + Math.sin(a) * r,
    rot: Math.random() * Math.PI * 2,
    age: 0,
    sizeMul,
  });
}

// Five chunkier splashes at the bounce point so wall hits read clearly.
export function spawnBounceSplash(x: number, y: number) {
  for (let i = 0; i < 5; i++) spawnSplash(x, y, 1.35);
}

export function updateSplashes(dt: number) {
  timer += dt;
  const interval = 1 / config.splash.spawnHz;
  while (timer > interval) {
    spawnSplash(stream.x, stream.y);
    timer -= interval;
  }
  for (let i = splashes.length - 1; i >= 0; i--) {
    splashes[i].age += dt;
    if (splashes[i].age >= config.splash.life) splashes.splice(i, 1);
  }
}

export function clearSplashes() {
  splashes.length = 0;
  timer = 0;
}
