import { config } from './config';
import { destroyedCount, totalChunks } from './grid';

// Run loop state machine. Phase 3 only deals with: tank drain while playing,
// reaching the clean target (win), running out of water (lose), and surfacing
// the resulting stats. Phase 4 (currency) reads from the final RunResult.

export type RunState = 'playing' | 'won' | 'lost';

export interface RunResult {
  state: 'won' | 'lost';
  durationSec: number;
  cleanedPct: number;       // 0..100
  waterLeft: number;        // 0..1
  efficiency: number;       // 0..1 — chunks per unit water spent
}

const run = {
  state: 'playing' as RunState,
  water: 1,
  startTime: 0,
  endTime: 0,
  result: null as RunResult | null,
};

export function getRun() { return run; }

export function startRun(now: number) {
  run.state = 'playing';
  run.water = 1;
  run.startTime = now;
  run.endTime = 0;
  run.result = null;
}

function buildResult(state: 'won' | 'lost', now: number): RunResult {
  const cleanedRatio = destroyedCount() / Math.max(1, totalChunks());
  const waterSpent = Math.max(0.0001, 1 - run.water);
  return {
    state,
    durationSec: (now - run.startTime) / 1000,
    cleanedPct: cleanedRatio * 100,
    waterLeft: run.water,
    // Cleaning efficiency: how much of the wall you cleared per unit water.
    // 1.0 means you cleared everything with one full tank.
    efficiency: Math.min(1, cleanedRatio / waterSpent),
  };
}

// Called once per frame before stream/grid update. Drains water and resolves
// win/lose. Returns true if physics should keep running this frame.
export function tickRun(dt: number, now: number): boolean {
  if (run.state !== 'playing') return false;

  const drainPerSec = (1 / Math.max(0.001, config.run.tankSeconds)) * config.run.drainMultiplier;
  run.water = Math.max(0, run.water - drainPerSec * dt);

  const cleanedPct = (destroyedCount() / Math.max(1, totalChunks())) * 100;
  if (cleanedPct >= config.run.cleanTargetPct) {
    run.state = 'won';
    run.endTime = now;
    run.result = buildResult('won', now);
    return false;
  }
  if (run.water <= 0) {
    run.state = 'lost';
    run.endTime = now;
    run.result = buildResult('lost', now);
    return false;
  }
  return true;
}
