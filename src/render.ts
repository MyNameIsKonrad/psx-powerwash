import { config } from './config';
import { stream } from './stream';
import { grid } from './grid';
import { tiles } from './tiles';
import { splashes } from './splash';

export function render(ctx: CanvasRenderingContext2D, W: number, H: number) {
  // Clean wall surface
  ctx.fillStyle = config.wallColor;
  ctx.fillRect(0, 0, W, H);

  // Standing chunks
  ctx.fillStyle = '#000000';
  const cs = config.grid.chunkSize;
  const drawSize = cs - config.grid.chunkGap;
  for (let r = 0; r < grid.rows; r++) {
    const rowBase = r * grid.cols;
    for (let c = 0; c < grid.cols; c++) {
      if (grid.data[rowBase + c]) {
        ctx.fillRect(c * cs, r * cs, drawSize, drawSize);
      }
    }
  }

  // Flying tiles — instant launch, tumble, shrink. No hitstop.
  for (const t of tiles) {
    ctx.save();
    ctx.translate(t.x, t.y);
    ctx.rotate(t.rot);
    ctx.scale(t.scale, t.scale);
    ctx.fillStyle = '#000000';
    const half = t.size / 2;
    ctx.fillRect(-half, -half, t.size, t.size);
    ctx.restore();
  }

  // Splash tiles — angular water impact. Stiff alpha: hold 0.7 for 80% of
  // life, then snap to 0 in last 20%. Smooth fade was tried and rejected.
  ctx.lineWidth = config.splash.lineWidth;
  for (const s of splashes) {
    const k = s.age / config.splash.life;
    const size = (config.splash.startSize + (config.splash.endSize - config.splash.startSize) * k) * s.sizeMul;
    const alpha = 0.7 * (k < 0.8 ? 1 : (1 - k) / 0.2);
    ctx.strokeStyle = `rgba(${config.splash.r},${config.splash.g},${config.splash.b},${alpha})`;
    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.rotate(s.rot);
    const half = size / 2;
    ctx.strokeRect(-half, -half, size, size);
    ctx.restore();
  }

  // Tiny precise stream marker so the position is always readable through splashes.
  ctx.fillStyle = `rgba(${config.splash.r},${config.splash.g},${config.splash.b},0.95)`;
  ctx.fillRect(stream.x - 2.5, stream.y - 2.5, 5, 5);
}
