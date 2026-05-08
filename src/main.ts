import { resetStream, updateStream } from './stream';
import { setupInput, isHeld } from './input';
import { initGrid, damageGrid } from './grid';
import { spawnFlyingTile, updateTiles, clearTiles } from './tiles';
import { spawnBounceSplash, updateSplashes, clearSplashes } from './splash';
import { render } from './render';

const canvas = document.getElementById('stage') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const resetBtn = document.getElementById('reset') as HTMLButtonElement;

let W = 0, H = 0, DPR = 1;

function resize() {
  // Cap DPR at 2 — beyond that we pay a lot of fill cost for almost no
  // perceptual gain on the chunky aesthetic.
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W * DPR;
  canvas.height = H * DPR;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  initGrid(W, H);
}

setupInput(canvas, () => W, () => H);

resetBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  initGrid(W, H);
  clearTiles();
  clearSplashes();
  resetStream(W, H);
});

let lastT = performance.now();
function loop() {
  const t = performance.now();
  // Cap dt to avoid huge steps after tab switch / minimization. All physics
  // is dt-based in px/sec — Safari can ramp to 120Hz mid-session and naive
  // per-frame deltas would double speeds.
  let dt = (t - lastT) / 1000;
  lastT = t;
  if (dt > 0.05) dt = 0.05;

  updateStream(dt, W, H, isHeld(), spawnBounceSplash);
  damageGrid(spawnFlyingTile);
  updateSplashes(dt);
  updateTiles(dt, H);

  render(ctx, W, H);
  requestAnimationFrame(loop);
}

window.addEventListener('resize', () => { resize(); resetStream(W, H); });
resize();
resetStream(W, H);
lastT = performance.now();
loop();
