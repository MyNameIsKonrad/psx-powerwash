import { config } from './config';
import { stream } from './stream';
import { effective } from './effective';

// Flat-array chunk grid storing remaining HP per cell. idx = r * cols + c.
// HP == 0 means destroyed; HP == config.grid.chunkHp means fully dirty.

export const grid = {
  cols: 0,
  rows: 0,
  data: new Uint8Array(0),
  initialAlive: 0,
};

export function initGrid(W: number, H: number) {
  const cs = effective.chunkSize;
  grid.cols = Math.ceil(W / cs);
  grid.rows = Math.ceil(H / cs);
  grid.data = new Uint8Array(grid.cols * grid.rows);
  const hp = Math.max(1, config.grid.chunkHp | 0);
  grid.data.fill(hp);
  grid.initialAlive = grid.cols * grid.rows;
}

// Damage cells whose center falls inside the stream's erase disc. Each frame
// inside the disc removes one HP per cell — fast scrub through 1-HP walls,
// satisfying multi-pass scrub through higher-HP walls.
export function damageGrid(onDestroy: (cx: number, cy: number) => void) {
  const cs = effective.chunkSize;
  const r = effective.eraseRadius;
  const r2 = effective.eraseRadiusSq;
  const cMin = Math.max(0, Math.floor((stream.x - r) / cs));
  const cMax = Math.min(grid.cols - 1, Math.floor((stream.x + r) / cs));
  const rMin = Math.max(0, Math.floor((stream.y - r) / cs));
  const rMax = Math.min(grid.rows - 1, Math.floor((stream.y + r) / cs));

  for (let row = rMin; row <= rMax; row++) {
    for (let col = cMin; col <= cMax; col++) {
      const idx = row * grid.cols + col;
      const hp = grid.data[idx];
      if (hp === 0) continue;
      const cx = col * cs + cs / 2;
      const cy = row * cs + cs / 2;
      const dx = cx - stream.x;
      const dy = cy - stream.y;
      if (dx * dx + dy * dy <= r2) {
        const next = hp - 1;
        grid.data[idx] = next;
        if (next === 0) onDestroy(cx, cy);
      }
    }
  }
}

export function totalChunks() { return grid.initialAlive; }
export function destroyedCount() {
  let n = 0;
  const d = grid.data;
  for (let i = 0; i < d.length; i++) if (d[i] === 0) n++;
  return n;
}
