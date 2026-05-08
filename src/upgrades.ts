import type { RunResult } from './run';

// Phase 4 scaffold: persistent currency in localStorage and a list of named
// upgrade slots. Upgrades currently have no gameplay effect — they level up
// and consume currency so the loop is real, but the tunables they would
// modify are wired up in stub form (see `applyUpgradeMods`). When we want
// real effects in a later iteration, replace the stub bodies.

const STORE_KEY = 'psxwash:save';

export interface UpgradeDef {
  id: string;
  name: string;
  blurb: string;
  baseCost: number;
  costGrowth: number;   // multiplier per level
  maxLevel: number;
}

export interface SaveState {
  currency: number;
  levels: Record<string, number>;
}

export const UPGRADES: UpgradeDef[] = [
  { id: 'tank',     name: 'tank size',     blurb: '+10% water capacity',     baseCost: 25, costGrowth: 1.6, maxLevel: 8 },
  { id: 'pressure', name: 'stream pressure', blurb: '+8% free speed',         baseCost: 30, costGrowth: 1.7, maxLevel: 8 },
  { id: 'nozzle',   name: 'nozzle width',  blurb: '+6% erase radius',        baseCost: 40, costGrowth: 1.8, maxLevel: 6 },
  { id: 'recovery', name: 'water recovery', blurb: '-5% drain rate',         baseCost: 50, costGrowth: 1.9, maxLevel: 5 },
  { id: 'payout',   name: 'soap subsidy',  blurb: '+10% currency earned',    baseCost: 60, costGrowth: 2.0, maxLevel: 6 },
];

function emptySave(): SaveState {
  return { currency: 0, levels: Object.fromEntries(UPGRADES.map(u => [u.id, 0])) };
}

let state: SaveState = load();

function load(): SaveState {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return emptySave();
    const parsed = JSON.parse(raw);
    return { ...emptySave(), ...parsed, levels: { ...emptySave().levels, ...(parsed.levels || {}) } };
  } catch { return emptySave(); }
}

function save() { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }

export function getState() { return state; }
export function getCurrency() { return state.currency; }
export function getLevel(id: string) { return state.levels[id] ?? 0; }

export function costFor(def: UpgradeDef, level: number) {
  return Math.round(def.baseCost * Math.pow(def.costGrowth, level));
}

export function tryBuy(id: string): boolean {
  const def = UPGRADES.find(u => u.id === id);
  if (!def) return false;
  const lvl = getLevel(id);
  if (lvl >= def.maxLevel) return false;
  const cost = costFor(def, lvl);
  if (state.currency < cost) return false;
  state.currency -= cost;
  state.levels[id] = lvl + 1;
  save();
  return true;
}

// Currency awarded for a finished run. Win gives a clean-pct-weighted base;
// efficiency adds a kicker; payout-subsidy upgrade scales the total.
export function awardCurrency(result: RunResult): number {
  const base = result.state === 'won' ? 60 : 20;
  const cleanComponent  = (result.cleanedPct / 100) * 80;
  const efficiencyBonus = result.efficiency * 40;
  const subsidyMul = 1 + 0.10 * getLevel('payout');
  const total = Math.round((base + cleanComponent + efficiencyBonus) * subsidyMul);
  state.currency += total;
  save();
  return total;
}

// Per-run modifier object. Currently consumed only by main.ts which applies
// it on top of base config at startRun time. Phase 4 brief says scaffold is
// fine — these multipliers stay subtle so balance work isn't blocked on it.
export interface UpgradeMods {
  tankMul: number;
  speedMul: number;
  radiusMul: number;
  drainMul: number;
}

export function currentMods(): UpgradeMods {
  return {
    tankMul:   1 + 0.10 * getLevel('tank'),
    speedMul:  1 + 0.08 * getLevel('pressure'),
    radiusMul: 1 + 0.06 * getLevel('nozzle'),
    drainMul:  1 - 0.05 * getLevel('recovery'),
  };
}

// Dev-only: reset persistent save. Wire to a GUI button if helpful.
export function resetSave() { state = emptySave(); save(); }
