import { config } from './config';
import { stream } from './stream';
import { effective } from './effective';

// Flat-array chunk grid. idx = r * cols + c.
// data: HP per cell (Float32, <= 0 means destroyed).
// rot/scaleFactor: per-cell visual transform for an organic non-uniform look.

export const grid = {
  cols: 0,
  rows: 0,
  data: new Float32Array(0),
  rot: new Float32Array(0),
  scaleFactor: new Float32Array(0),
  initialAlive: 0,
};

// Re-randomize visual surface variation without touching HP.
// Called by initGrid and by the lil-gui "randomize surface" button.
export function reseedSurface() {
  const n = grid.cols * grid.rows;
  for (let i = 0; i < n; i++) {
    grid.rot[i] = (Math.random() * 2 - 1) * config.grid.rotJitter;
    grid.scaleFactor[i] = 1 - Math.random() * config.grid.scaleJitter;
  }
}

export function initGrid(W: number, H: number) {
  const cs = effective.chunkSize;
  grid.cols = Math.ceil(W / cs);
  grid.rows = Math.ceil(H / cs);
  const n = grid.cols * grid.rows;
  grid.data = new Float32Array(n);
  grid.data.fill(config.grid.surfaceResistance);
  grid.rot = new Float32Array(n);
  grid.scaleFactor = new Float32Array(n);
  grid.initialAlive = n;
  reseedSurface();
}

// Damage cells whose center falls inside the stream's erase disc. Damage is
// dt-based so scrub speed is identical at 60 Hz and 120 Hz.
// If hardness > 0, live chunks also push back on stream velocity (summed,
// applied after the loop to avoid per-chunk jitter).
export function damageGrid(dt: number, onDestroy: (cx: number, cy: number) => void) {
  const cs = effective.chunkSize;
  const r = effective.eraseRadius;
  const r2 = effective.eraseRadiusSq;
  const dmg = effective.damageRate * dt;
  const maxHp = config.grid.surfaceResistance;
  const hardness = effective.surfaceHardness;
  const cMin = Math.max(0, Math.floor((stream.x - r) / cs));
  const cMax = Math.min(grid.cols - 1, Math.floor((stream.x + r) / cs));
  const rMin = Math.max(0, Math.floor((stream.y - r) / cs));
  const rMax = Math.min(grid.rows - 1, Math.floor((stream.y + r) / cs));

  let fx = 0, fy = 0;

  for (let row = rMin; row <= rMax; row++) {
    for (let col = cMin; col <= cMax; col++) {
      const idx = row * grid.cols + col;
      const hp = grid.data[idx];
      if (hp <= 0) continue;
      const cx = col * cs + cs / 2;
      const cy = row * cs + cs / 2;
      const dx = cx - stream.x;
      const dy = cy - stream.y;
      const d2 = dx * dx + dy * dy;
      if (d2 <= r2) {
        const next = hp - dmg;
        grid.data[idx] = next;
        if (next <= 0) onDestroy(cx, cy);

        if (hardness > 0) {
          // Repulsion: direction from chunk center → stream (pushes stream away).
          // Weighted by proximity (center hits harder) and hp fraction (worn chunks yield).
          const dist = Math.sqrt(d2) || 1;
          const proximity = 1 - dist / r;
          const hpFrac = Math.min(1, hp / maxHp);
          fx += (-dx / dist) * proximity * hpFrac;
          fy += (-dy / dist) * proximity * hpFrac;
        }
      }
    }
  }

  // Apply accumulated surface pushback after the loop.
  if (hardness > 0) {
    const SCALE = 500; // px/s² per unit force at hardness 1
    stream.vx += fx * hardness * SCALE * dt;
    stream.vy += fy * hardness * SCALE * dt;
  }
}

export function totalChunks() { return grid.initialAlive; }
export function destroyedCount() {
  let n = 0;
  const d = grid.data;
  for (let i = 0; i < d.length; i++) if (d[i] <= 0) n++;
  return n;
}
