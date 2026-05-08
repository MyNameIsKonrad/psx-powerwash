import { config } from './config';
import { stream } from './stream';

// Flying tile = a destroyed chunk launched as a physical square. No hitstop,
// no anticipation — instant launch and stiff disappear via shrink + gravity.

export interface Tile {
  x: number; y: number;
  vx: number; vy: number;
  rot: number; rotV: number;
  size: number;
  scale: number;
}

export const tiles: Tile[] = [];

// Defensive cap so pathological config (tiny chunks, huge erase radius) can't
// blow memory before shrink/gravity removes tiles. Generous — well above any
// reasonable visible count.
const TILE_HARD_CAP = 1200;

export function spawnFlyingTile(x: number, y: number) {
  // Knock direction: away from the stream's center.
  const dx = x - stream.x;
  const dy = y - stream.y;
  const dist = Math.hypot(dx, dy) || 1;
  const knockX = dx / dist;
  const knockY = dy / dist;

  // Inherit a slice of the stream's current velocity so cleaning sweeps
  // tiles along with the motion. Higher than ~0.3 felt floppy.
  const streamSpeed = Math.hypot(stream.vx, stream.vy) || 1;
  const k = config.tiles.streamInherit;
  const inheritX = (stream.vx / streamSpeed) * k * streamSpeed;
  const inheritY = (stream.vy / streamSpeed) * k * streamSpeed;

  const launch = config.tiles.knockBase + Math.random() * config.tiles.knockVar;
  if (tiles.length >= TILE_HARD_CAP) tiles.shift();
  tiles.push({
    x, y,
    vx: knockX * launch + inheritX,
    vy: knockY * launch + inheritY + config.tiles.upwardKick,
    rot: (Math.random() - 0.5) * 0.4,
    rotV: (Math.random() * 2 - 1) * config.tiles.rotMax,
    size: config.grid.chunkSize - config.grid.chunkGap,
    scale: 1,
  });
}

export function updateTiles(dt: number, H: number) {
  for (let i = tiles.length - 1; i >= 0; i--) {
    const t = tiles[i];
    t.vy += config.tiles.gravity * dt;
    t.x  += t.vx * dt;
    t.y  += t.vy * dt;
    t.rot += t.rotV * dt;
    t.scale -= config.tiles.shrink * dt;
    if (t.y > H + 80 || t.scale <= 0.05) tiles.splice(i, 1);
  }
}

export function clearTiles() { tiles.length = 0; }
