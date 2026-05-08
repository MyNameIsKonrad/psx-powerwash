// Web Gamepad API support. Cross-platform: covers Steam Deck (which surfaces
// its built-in controller as a standard gamepad in browsers), Xbox/PS pads
// on desktop, and Bluetooth controllers paired with phones/tablets. Polled
// once per frame from main; stream physics reads the latest stick state.

const STICK_DEADZONE = 0.18;

interface Stick { x: number; y: number; mag: number }

let lastStick: Stick | null = null;
let connected = false;
const lastButtons: boolean[] = [];

let pauseHandler: (() => void) | null = null;
let restartHandler: (() => void) | null = null;
let guiHandler: (() => void) | null = null;

export function setupGamepad(opts: {
  onPause: () => void;
  onRestart: () => void;
  onToggleGui: () => void;
}) {
  pauseHandler = opts.onPause;
  restartHandler = opts.onRestart;
  guiHandler = opts.onToggleGui;
  window.addEventListener('gamepadconnected',    () => { connected = true; });
  window.addEventListener('gamepaddisconnected', () => {
    // navigator.getGamepads can still report another connected pad; recheck.
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    connected = Array.from(pads).some(p => !!p && p.connected);
  });
}

export function pollGamepad() {
  if (!navigator.getGamepads) return;
  const pads = navigator.getGamepads();
  let pad: Gamepad | null = null;
  for (const p of pads) { if (p && p.connected) { pad = p; break; } }
  if (!pad) { lastStick = null; return; }
  connected = true;

  // Rising-edge button detection. Button indices follow the W3C "standard"
  // mapping that most browsers expose for Xbox-layout pads:
  //   1 = B/circle, 2 = X/square, 3 = Y/triangle, 9 = start/options.
  for (let i = 0; i < pad.buttons.length; i++) {
    const pressed = pad.buttons[i].pressed;
    const prev = lastButtons[i] || false;
    if (pressed && !prev) {
      if (i === 9)      pauseHandler?.();
      else if (i === 3) restartHandler?.();
      else if (i === 2) guiHandler?.();
    }
    lastButtons[i] = pressed;
  }

  const lx = pad.axes[0] ?? 0;
  const ly = pad.axes[1] ?? 0;
  const mag = Math.hypot(lx, ly);
  if (mag < STICK_DEADZONE) { lastStick = null; return; }
  // Rescale magnitude past the deadzone so input feels linear from edge.
  const scaled = Math.min(1, (mag - STICK_DEADZONE) / (1 - STICK_DEADZONE));
  lastStick = { x: lx / mag, y: ly / mag, mag: scaled };
}

export function gamepadStick(): Stick | null { return lastStick; }
export function isGamepadConnected(): boolean { return connected; }
