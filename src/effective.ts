import { config } from './config';
import { currentMods } from './upgrades';

// Resolved gameplay values = config (lil-gui-edited base) × upgrade mods × resolution scale.
// Cached on a single object so hot-loop consumers don't pay repeated lookups.
// Recomputed once per frame (and inside resize() before initGrid runs).

export const effective = {
  // Resolution scale relative to reference (1280×720). 1.0 at reference.
  scale: 1,

  freeSpeed: 280,
  eraseRadius: 32,
  eraseRadiusSq: 32 * 32,
  maxThrowSpeed: 1800,
  minThrowSpeed: 120,
  tankSeconds: 30,
  drainMultiplier: 1,

  chunkSize: 22,

  splashJitter: 14,
  splashStartSize: 12,
  splashEndSize: 36,
  splashLineWidth: 2,

  tilesKnockBase: 110,
  tilesKnockVar: 55,
  tilesGravity: 2600,
  tilesUpwardKick: -50,

  keyboardAccel: 2400,
  keyboardMaxSpeed: 900,
  edgeSnapDist: 60,
};

export function recomputeEffective(W: number, H: number) {
  const m = currentMods();
  // Scale by the shorter virtual edge vs. the shorter reference edge so portrait
  // and landscape feel equivalent — the "thickness" of the play area stays calibrated.
  const scale = Math.min(W, H)
    / Math.min(config.display.referenceWidth, config.display.referenceHeight);
  effective.scale           = scale;

  effective.freeSpeed       = config.stream.freeSpeed      * m.speedMul  * scale;
  effective.eraseRadius     = config.stream.eraseRadius    * m.radiusMul * scale;
  effective.eraseRadiusSq   = effective.eraseRadius * effective.eraseRadius;
  effective.maxThrowSpeed   = config.stream.maxThrowSpeed  * scale;
  effective.minThrowSpeed   = config.stream.minThrowSpeed  * scale;
  effective.tankSeconds     = config.run.tankSeconds       * m.tankMul;
  effective.drainMultiplier = config.run.drainMultiplier   * m.drainMul;

  effective.chunkSize       = config.grid.chunkSize        * scale;

  effective.splashJitter    = config.splash.jitter         * scale;
  effective.splashStartSize = config.splash.startSize      * scale;
  effective.splashEndSize   = config.splash.endSize        * scale;
  effective.splashLineWidth = config.splash.lineWidth      * scale;

  effective.tilesKnockBase  = config.tiles.knockBase       * scale;
  effective.tilesKnockVar   = config.tiles.knockVar        * scale;
  effective.tilesGravity    = config.tiles.gravity         * scale;
  effective.tilesUpwardKick = config.tiles.upwardKick      * scale;

  effective.keyboardAccel      = config.keyboard.accel     * scale;
  effective.keyboardMaxSpeed   = config.keyboard.maxSpeed  * scale;
  effective.edgeSnapDist       = config.edgeSnap.dist      * scale;
}
