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

  // Standing chunks. Shade lerps from black (fresh dirt) to warm brown
  // (nearly cleared) based on remaining HP fraction.
  const cs = effective.chunkSize;
  const drawSize = Math.max(1, cs - config.grid.chunkGap);
  const maxHp = config.grid.surfaceResistance;
  // 64-step LUT so we don't build a new string per visible chunk per frame.
  const LUT = 64;
  const colorLut: string[] = new Array(LUT + 1);
  for (let i = 0; i <= LUT; i++) {
    const t = i / LUT; // 0 = fresh (black), 1 = worn (brown)
    const cr = Math.round(0   + 130 * t);
    const cg = Math.round(0   +  86 * t);
    const cb = Math.round(0   +  48 * t);
    colorLut[i] = `rgb(${cr},${cg},${cb})`;
  }
  for (let r = 0; r < grid.rows; r++) {
    const rowBase = r * grid.cols;
    for (let c = 0; c < grid.cols; c++) {
      const idx = rowBase + c;
      const hp = grid.data[idx];
      if (hp <= 0) continue;
      const lutIdx = Math.round((1 - hp / maxHp) * LUT);
      ctx.fillStyle = colorLut[Math.max(0, Math.min(LUT, lutIdx))];
      const sf = grid.scaleFactor[idx];
      const half = drawSize * sf / 2;
      ctx.save();
      ctx.translate(c * cs + cs / 2, r * cs + cs / 2);
      ctx.rotate(grid.rot[idx]);
      ctx.fillRect(-half, -half, half * 2, half * 2);
      ctx.restore();
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
