import type { RunResult } from './run';
import { UPGRADES, costFor, getCurrency, getLevel, tryBuy } from './upgrades';

// Thin wrapper around the HUD + overlay DOM defined in index.html. Keeps DOM
// queries off the hot loop and centralizes show/hide logic.

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const waterFill = $<HTMLDivElement>('waterFill');
const cleanVal  = $<HTMLDivElement>('cleanVal');
const timeVal   = $<HTMLDivElement>('timeVal');

const endOverlay  = $<HTMLDivElement>('endOverlay');
const endTitle    = $<HTMLHeadingElement>('endTitle');
const endVerdict  = $<HTMLDivElement>('endVerdict');
const endTime     = $<HTMLDivElement>('endTime');
const endClean    = $<HTMLDivElement>('endClean');
const endWater    = $<HTMLDivElement>('endWater');
const endEff      = $<HTMLDivElement>('endEff');
const endEarned   = $<HTMLDivElement>('endEarned');
const endContinue = $<HTMLButtonElement>('endContinue');

const shopOverlay = $<HTMLDivElement>('shopOverlay');
const shopStart   = $<HTMLButtonElement>('shopStart');
const shopBalance = $<HTMLDivElement>('shopBalance');
const upgradeList = $<HTMLDivElement>('upgradeList');

export function updateHud(water: number, cleanedPct: number, timeSec: number) {
  waterFill.style.width = `${Math.max(0, Math.min(1, water)) * 100}%`;
  cleanVal.textContent = `${cleanedPct.toFixed(0)}%`;
  timeVal.textContent  = `${timeSec.toFixed(1)}`;
}

export function showEndScreen(result: RunResult, earned: number, onContinue: () => void) {
  endTitle.textContent = result.state === 'won' ? 'clean!' : 'out of water';
  endVerdict.textContent = result.state === 'won'
    ? 'wall is clean. nice flicks.'
    : 'tank ran dry before the wall was clean.';
  endTime.textContent   = `${result.durationSec.toFixed(1)}s`;
  endClean.textContent  = `${result.cleanedPct.toFixed(1)}%`;
  endWater.textContent  = `${(result.waterLeft * 100).toFixed(0)}%`;
  endEff.textContent    = `${(result.efficiency * 100).toFixed(0)}%`;
  endEarned.textContent = `+${earned}`;
  endOverlay.classList.add('show');
  endContinue.onclick = () => {
    endOverlay.classList.remove('show');
    onContinue();
  };
}

export function hideEndScreen() { endOverlay.classList.remove('show'); }

export function renderShop() {
  shopBalance.textContent = String(getCurrency());
  upgradeList.innerHTML = '';
  for (const def of UPGRADES) {
    const lvl = getLevel(def.id);
    const cost = costFor(def, lvl);
    const max = lvl >= def.maxLevel;
    const can = !max && getCurrency() >= cost;

    const row = document.createElement('div');
    row.className = 'upgrade';
    const meta = document.createElement('div');
    meta.className = 'meta';
    const nameEl = document.createElement('span');
    nameEl.className = 'name';
    nameEl.textContent = def.name;
    const lvlEl = document.createElement('span');
    lvlEl.className = 'lvl';
    lvlEl.textContent = `lvl ${lvl}/${def.maxLevel} · ${def.blurb}`;
    meta.appendChild(nameEl);
    meta.appendChild(lvlEl);

    const btn = document.createElement('button');
    btn.textContent = max ? 'max' : `buy · ${cost}`;
    btn.disabled = !can;
    btn.addEventListener('click', () => {
      if (tryBuy(def.id)) renderShop();
    });

    row.appendChild(meta);
    row.appendChild(btn);
    upgradeList.appendChild(row);
  }
}

export function showShop(onStart: () => void) {
  renderShop();
  shopOverlay.classList.add('show');
  shopStart.onclick = () => {
    shopOverlay.classList.remove('show');
    onStart();
  };
}

export function hideShop() { shopOverlay.classList.remove('show'); }
