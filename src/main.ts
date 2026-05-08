import { resetStream, updateStream } from './stream';
import { setupInput, isHeld, onCornerTap, setInputEnabled } from './input';
import { initGrid, damageGrid, destroyedCount, totalChunks } from './grid';
import { spawnFlyingTile, updateTiles, clearTiles } from './tiles';
import { spawnBounceSplash, updateSplashes, clearSplashes } from './splash';
import { render } from './render';
import { setupGui, toggleGui } from './gui';
import { startRun, tickRun, getRun } from './run';
import { updateHud, showEndScreen, showShop, setFps } from './hud';
import { awardCurrency } from './upgrades';

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

function beginNewRun() {
  initGrid(W, H);
  clearTiles();
  clearSplashes();
  resetStream(W, H);
  setInputEnabled(true);
  startRun(performance.now());
}

setupInput(canvas, () => W, () => H);
setupGui(() => W, () => H);
onCornerTap(toggleGui);

resetBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  beginNewRun();
});

let lastT = performance.now();
// Sliding-window FPS: cheap and stable, only displayed when debug toggle is on.
const fpsFrames: number[] = [];
let fpsUpdateAt = 0;

function loop() {
  const t = performance.now();
  // Cap dt to avoid huge steps after tab switch / minimization. All physics
  // is dt-based in px/sec — Safari can ramp to 120Hz mid-session and naive
  // per-frame deltas would double speeds.
  let dt = (t - lastT) / 1000;
  lastT = t;
  if (dt > 0.05) dt = 0.05;

  const run = getRun();
  if (run.state === 'playing') {
    updateStream(dt, W, H, isHeld(), spawnBounceSplash);
    damageGrid(spawnFlyingTile);
    updateSplashes(dt);
    updateTiles(dt, H);

    const stillPlaying = tickRun(dt, t);
    const cleanedPct = (destroyedCount() / Math.max(1, totalChunks())) * 100;
    updateHud(run.water, cleanedPct, (t - run.startTime) / 1000);

    if (!stillPlaying && run.result) {
      // Run just ended — freeze input, award currency, present end → shop → new run.
      setInputEnabled(false);
      const earned = awardCurrency(run.result);
      const result = run.result;
      showEndScreen(result, earned, () => {
        showShop(beginNewRun);
      });
    }
  }

  render(ctx, W, H);

  // FPS sample (kept cheap whether or not the readout is visible).
  fpsFrames.push(t);
  while (fpsFrames.length && t - fpsFrames[0] > 1000) fpsFrames.shift();
  if (t - fpsUpdateAt > 200) {
    setFps(fpsFrames.length);
    fpsUpdateAt = t;
  }

  requestAnimationFrame(loop);
}

window.addEventListener('resize', () => {
  resize();
  // Don't restart the run on rotate — just reseed the grid + stream so the
  // play area scales correctly.
  resetStream(W, H);
});
resize();
beginNewRun();
lastT = performance.now();
loop();
