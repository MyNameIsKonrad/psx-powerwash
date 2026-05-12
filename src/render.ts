import { config } from './config';
import { effective } from './effective';
import { stream } from './stream';
import { grid } from './grid';
import { tiles } from './tiles';
import { splashes } from './splash';

export function render(ctx: CanvasRenderingContext2D, W: number, H: number) {
  // Clean wall surface
  ctx.fillStyle = config.wallColor;
  ctx.fillRect(0, 0, W, H);

  // Standing chunks. Per-chunk shade comes from remaining HP — at full HP
  // chunks are pure black "dirt"; partially scrubbed chunks lerp toward a
  // muddy brown so the player can see they're working through layers.
  const cs = effective.chunkSize;
  const drawSize = Math.max(1, cs - config.grid.chunkGap);
  const maxHp = Math.max(1, config.grid.chunkHp | 0);
  // Endpoints of the dirt gradient. Black = fresh dirt; warm brown = nearly
  // washed off (chunk about to pop). Picked to read clearly against the
  // slate wall without becoming neon.
  const FULL = { r: 0, g: 0, b: 0 };
  const WORN = { r: 130, g: 86, b: 48 };
  const colorCache: string[] = [];
  for (let h = 1; h <= maxHp; h++) {
    const dmg = (maxHp - h) / Math.max(1, maxHp - 1); // 0 fresh, 1 worn (only for max>1)
    const t = maxHp === 1 ? 0 : dmg;
    const cr = Math.round(FULL.r + (WORN.r - FULL.r) * t);
    const cg = Math.round(FULL.g + (WORN.g - FULL.g) * t);
    const cb = Math.round(FULL.b + (WORN.b - FULL.b) * t);
    colorCache[h] = `rgb(${cr},${cg},${cb})`;
  }
  for (let r = 0; r < grid.rows; r++) {
    const rowBase = r * grid.cols;
    for (let c = 0; c < grid.cols; c++) {
      const hp = grid.data[rowBase + c];
      if (!hp) continue;
      ctx.fillStyle = colorCache[hp];
      ctx.fillRect(c * cs, r * cs, drawSize, drawSize);
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
  ctx.lineWidth = effective.splashLineWidth;
  for (const s of splashes) {
    const k = s.age / config.splash.life;
    const size = (effective.splashStartSize + (effective.splashEndSize - effective.splashStartSize) * k) * s.sizeMul;
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
