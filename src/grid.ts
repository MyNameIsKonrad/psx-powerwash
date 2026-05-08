import { config } from './config';
import { stream } from './stream';

// Flat-array chunk grid. idx = r * cols + c. 1 = present, 0 = destroyed.
// May grow to layered HP later; keep the API narrow so that change is local.

export const grid = {
  cols: 0,
  rows: 0,
  data: new Uint8Array(0),
};

export function initGrid(W: number, H: number) {
  const cs = config.grid.chunkSize;
  grid.cols = Math.ceil(W / cs);
  grid.rows = Math.ceil(H / cs);
  grid.data = new Uint8Array(grid.cols * grid.rows);
  grid.data.fill(1);
}

// Damage cells whose center falls inside the stream's erase disc.
// onDestroy receives the world-space center of each destroyed cell so the
// caller can spawn a flying tile there.
export function damageGrid(onDestroy: (cx: number, cy: number) => void) {
  const cs = config.grid.chunkSize;
  const r = config.stream.eraseRadius;
  const r2 = r * r;
  const cMin = Math.max(0, Math.floor((stream.x - r) / cs));
  const cMax = Math.min(grid.cols - 1, Math.floor((stream.x + r) / cs));
  const rMin = Math.max(0, Math.floor((stream.y - r) / cs));
  const rMax = Math.min(grid.rows - 1, Math.floor((stream.y + r) / cs));

  for (let row = rMin; row <= rMax; row++) {
    for (let col = cMin; col <= cMax; col++) {
      const idx = row * grid.cols + col;
      if (grid.data[idx] === 0) continue;
      const cx = col * cs + cs / 2;
      const cy = row * cs + cs / 2;
      const dx = cx - stream.x;
      const dy = cy - stream.y;
      if (dx * dx + dy * dy <= r2) {
        grid.data[idx] = 0;
        onDestroy(cx, cy);
      }
    }
  }
}

export function totalChunks() { return grid.cols * grid.rows; }
export function destroyedCount() {
  let n = 0;
  const d = grid.data;
  for (let i = 0; i < d.length; i++) if (d[i] === 0) n++;
  return n;
}
