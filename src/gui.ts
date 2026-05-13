import GUI from 'lil-gui';
import { config } from './config';
import { initGrid, reseedSurface } from './grid';
import { setFpsVisible } from './hud';
import { resetSave } from './upgrades';

const defaults = JSON.parse(JSON.stringify(config));
const PRESETS_KEY = 'psxwash:presets';

let gui: GUI | null = null;
let visible = false;

type Snapshot = typeof config;

function loadPresets(): Record<string, Snapshot> {
  try { return JSON.parse(localStorage.getItem(PRESETS_KEY) || '{}'); }
  catch { return {}; }
}
function savePresets(p: Record<string, Snapshot>) {
  localStorage.setItem(PRESETS_KEY, JSON.stringify(p));
}

function applySnapshot(snap: any) {
  for (const k of Object.keys(config) as (keyof typeof config)[]) {
    const sub = snap[k];
    const cur = config[k] as any;
    if (sub && typeof sub === 'object' && typeof cur === 'object') {
      Object.assign(cur, sub);
    } else if (sub !== undefined) {
      (config as any)[k] = sub;
    }
  }
  if (gui) gui.controllersRecursive().forEach(c => c.updateDisplay());
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(x => Math.round(x).toString(16).padStart(2, '0')).join('');
}
function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function injectGuiStyles() {
  const s = document.createElement('style');
  s.textContent = `
    .lil-gui {
      --background-color: #0d1117;
      --title-background-color: #010409;
      --title-text-color: #6e7884;
      --text-color: #c9d1d9;
      --widget-color: #161b22;
      --hover-color: #21262d;
      --focus-color: #4ea4ff;
      --number-color: #79c0ff;
      --string-color: #7ee787;
      --font-size: 13px;
      --input-font-size: 13px;
      --font-family: -apple-system, system-ui, 'Segoe UI', sans-serif;
      --row-height: 38px;
      --widget-height: 28px;
      --padding: 6px;
      --spacing: 3px;
      --widget-border-radius: 3px;
      --border-radius: 0px;
    }
    .lil-gui .title {
      font-size: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 700;
      padding: 0 8px;
    }
    .lil-gui .children .lil-gui .title {
      background: #0a0e14;
      font-size: 10px;
    }
    .lil-gui .controller {
      border-top: 1px solid rgba(255,255,255,0.04);
    }
    .lil-gui .controller.button .widget {
      height: var(--row-height);
      border-radius: 3px;
    }
  `;
  document.head.appendChild(s);
}

export function setupGui(getW: () => number, getH: () => number) {
  injectGuiStyles();

  gui = new GUI({ title: 'tuning · tap ↖ to hide', width: 280 });
  gui.hide();

  // ── Feel ──────────────────────────────────────────────────────────────────
  // The primary tuning zone. Open by default.
  const feelF = gui.addFolder('Feel');
  feelF.add(config.stream, 'drag',            0,    1, 0.01).name('drag');
  feelF.add(config.stream, 'eraseRadius',      8,  100,    1).name('erase radius (px)');
  feelF.add(config.stream, 'freeSpeed',       50,  800,    1).name('free speed (px/s)');
  feelF.add(config.stream, 'velWindowMs',    100,  400,    5).name('throw window (ms)');
  feelF.add(config.stream, 'bounceNudgeRad',   0,  0.3, 0.005).name('bounce nudge (rad)');
  feelF.add(config.stream, 'maxThrowSpeed',  400, 4000,   10).name('max throw');
  feelF.add(config.stream, 'minThrowSpeed',    0,  400,    5).name('min throw');

  const snapF = feelF.addFolder('Edge Snap');
  snapF.add(config.edgeSnap, 'dist',    10, 200,  1).name('snap dist (px)');
  snapF.add(config.edgeSnap, 'tan',      0, 1.5, 0.01).name('slow tolerance');
  snapF.add(config.edgeSnap, 'tanFast',  0, 2.0, 0.01).name('fast tolerance');
  snapF.close();

  // ── Surface ───────────────────────────────────────────────────────────────
  // Open by default — this is where the powerwash feel lives.
  const surfF = gui.addFolder('Surface');
  surfF.add(config.grid, 'surfaceResistance', 0.5, 20,   0.5).name('resistance (sec)')
    .onFinishChange(() => initGrid(getW(), getH()));
  surfF.add(config.grid, 'damageRate',        0.5, 10,   0.5).name('damage rate (hp/s)');
  surfF.add(config.grid, 'hardness',            0,  1,  0.01).name('hardness');
  surfF.add(config.grid, 'chunkSize',           4, 64,     1).name('chunk size (px)')
    .onFinishChange(() => initGrid(getW(), getH()));
  surfF.add(config.grid, 'chunkGap',            0,  6,     1).name('chunk gap')
    .onFinishChange(() => initGrid(getW(), getH()));
  surfF.add(config.grid, 'rotJitter',    0, Math.PI / 4, 0.01).name('rotation jitter');
  surfF.add(config.grid, 'scaleJitter',          0, 0.5,  0.01).name('scale jitter');
  surfF.add({ randomize: () => reseedSurface() }, 'randomize').name('randomize surface');

  const tilesF = surfF.addFolder('Flying tiles');
  tilesF.add(config.tiles, 'gravity',         0, 6000,  50).name('gravity');
  tilesF.add(config.tiles, 'knockBase',       0,  400,   5).name('knock base');
  tilesF.add(config.tiles, 'knockVar',        0,  400,   5).name('knock variance');
  tilesF.add(config.tiles, 'streamInherit',   0,    1, 0.01).name('stream inherit');
  tilesF.add(config.tiles, 'rotMax',          0,   20,  0.1).name('rot max (rad/s)');
  tilesF.add(config.tiles, 'shrink',          0,    8,  0.1).name('shrink rate');
  tilesF.add(config.tiles, 'upwardKick',   -300,  100,    5).name('upward kick');
  tilesF.close();

  // ── Visual ────────────────────────────────────────────────────────────────
  const visF = gui.addFolder('Visual');
  visF.close();

  const splashF = visF.addFolder('Splash');
  splashF.add(config.splash, 'spawnHz',     0, 200,   1).name('spawn Hz');
  splashF.add(config.splash, 'life',     0.02,   1, 0.01).name('life (s)');
  splashF.add(config.splash, 'startSize',   0,  80,   1).name('start size');
  splashF.add(config.splash, 'endSize',     0, 200,   1).name('end size');
  splashF.add(config.splash, 'lineWidth', 0.5,   8, 0.5).name('line width');
  splashF.add(config.splash, 'jitter',      0,  80,   1).name('jitter');
  const colorProxy = { color: rgbToHex(config.splash.r, config.splash.g, config.splash.b) };
  splashF.addColor(colorProxy, 'color').name('color').onChange((v: string) => {
    const { r, g, b } = hexToRgb(v);
    config.splash.r = r; config.splash.g = g; config.splash.b = b;
  });

  visF.addColor(config, 'wallColor').name('wall color');

  const dispF = visF.addFolder('Display');
  dispF.add(config.display, 'responsiveMode', ['aspect', 'fixed', 'continuous'])
    .name('mode').onFinishChange(() => window.dispatchEvent(new Event('resize')));
  dispF.add(config.display, 'referenceWidth',  320, 1920, 16).name('ref width')
    .onFinishChange(() => window.dispatchEvent(new Event('resize')));
  dispF.add(config.display, 'referenceHeight', 180, 1080, 16).name('ref height')
    .onFinishChange(() => window.dispatchEvent(new Event('resize')));
  dispF.add(config.display, 'virtualWidth',  320, 3840, 16).name('virtual width')
    .onFinishChange(() => window.dispatchEvent(new Event('resize')));
  dispF.add(config.display, 'virtualHeight', 180, 2160, 16).name('virtual height')
    .onFinishChange(() => window.dispatchEvent(new Event('resize')));
  dispF.addColor(config.display, 'letterbox').name('letterbox');
  dispF.close();

  // ── Input ─────────────────────────────────────────────────────────────────
  const inputF = gui.addFolder('Input');
  inputF.close();

  const kbF = inputF.addFolder('Keyboard');
  kbF.add(config.keyboard, 'accel',     0, 8000, 50).name('accel (px/s²)');
  kbF.add(config.keyboard, 'maxSpeed',  0, 3000, 25).name('max speed');
  kbF.add(config.keyboard, 'perpBrake', 0,   12, 0.1).name('perp brake');

  const runF = inputF.addFolder('Run');
  runF.add(config.run, 'tankSeconds',      5, 120,    1).name('tank (s)');
  runF.add(config.run, 'cleanTargetPct',  10, 100,    1).name('clean target %');
  runF.add(config.run, 'drainMultiplier',  0,   3, 0.05).name('drain multiplier');

  // ── Meta ──────────────────────────────────────────────────────────────────
  const metaF = gui.addFolder('Meta');
  metaF.close();

  const presetsF = metaF.addFolder('Presets');
  const presetState = { name: 'preset-1', selected: '' };
  const nameCtrl = presetsF.add(presetState, 'name').name('name');
  let listCtrl = presetsF.add(presetState, 'selected', ['']).name('saved');

  function refreshList() {
    const presets = loadPresets();
    const names = Object.keys(presets);
    listCtrl = listCtrl.options(names.length ? names : ['(none)']);
    if (names.length) listCtrl.setValue(names[0]);
  }
  refreshList();

  const actions = {
    save() {
      const presets = loadPresets();
      presets[presetState.name] = JSON.parse(JSON.stringify(config));
      savePresets(presets);
      refreshList();
    },
    load() {
      const presets = loadPresets();
      const snap = presets[presetState.selected];
      if (snap) { applySnapshot(snap); initGrid(getW(), getH()); }
    },
    delete() {
      const presets = loadPresets();
      delete presets[presetState.selected];
      savePresets(presets);
      refreshList();
    },
    resetDefaults() { applySnapshot(defaults); initGrid(getW(), getH()); },
  };
  presetsF.add(actions, 'save').name('save');
  presetsF.add(actions, 'load').name('load');
  presetsF.add(actions, 'delete').name('delete');
  presetsF.add(actions, 'resetDefaults').name('reset to defaults');

  const debugF = metaF.addFolder('Debug');
  debugF.close();
  const debugState = { showFps: false };
  debugF.add(debugState, 'showFps').name('show FPS').onChange((v: boolean) => setFpsVisible(v));
  debugF.add({ wipeSave: () => { resetSave(); } }, 'wipeSave').name('wipe save');

  void nameCtrl;
}

export function toggleGui() {
  if (!gui) return;
  visible = !visible;
  if (visible) gui.show(); else gui.hide();
}

export function isGuiVisible() { return visible; }
