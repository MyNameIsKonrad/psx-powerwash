import { config } from './config';
import { currentMods } from './upgrades';

// Resolved gameplay values = config (lil-gui-edited base) × upgrade mods.
// We cache them on a single object so hot-loop consumers don't pay multiple
// property+function lookups per chunk. Recomputed once per frame from main —
// 4 multiplies, negligible.

export const effective = {
  freeSpeed: 280,
  eraseRadius: 32,
  eraseRadiusSq: 32 * 32,
  tankSeconds: 30,
  drainMultiplier: 1,
};

export function recomputeEffective() {
  const m = currentMods();
  effective.freeSpeed      = config.stream.freeSpeed      * m.speedMul;
  effective.eraseRadius    = config.stream.eraseRadius    * m.radiusMul;
  effective.eraseRadiusSq  = effective.eraseRadius * effective.eraseRadius;
  effective.tankSeconds    = config.run.tankSeconds       * m.tankMul;
  effective.drainMultiplier= config.run.drainMultiplier   * m.drainMul;
}
