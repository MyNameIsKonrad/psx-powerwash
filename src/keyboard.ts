// Keyboard state for desktop / Steam play. Tracks which direction keys are
// held and exposes a normalized direction vector. Stream physics consumes
// this each frame to apply thrust.

const held = new Set<string>();

let pauseToggle: (() => void) | null = null;
let restart: (() => void) | null = null;

export function setupKeyboard(opts: { onPause: () => void; onRestart: () => void }) {
  pauseToggle = opts.onPause;
  restart = opts.onRestart;

  window.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    held.add(e.code);
    // Don't swallow modifier+key combos (devtools, refresh, etc.) — only act
    // on bare keys we own.
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.code === 'Escape') { e.preventDefault(); pauseToggle?.(); }
    if (e.code === 'KeyR')   { e.preventDefault(); restart?.(); }
  });
  window.addEventListener('keyup', (e) => { held.delete(e.code); });
  window.addEventListener('blur', () => held.clear());
}

// Returns the (raw, un-normalized) direction the player is asking for.
// Normalization is the caller's job since they may want to apply different
// strengths to cardinals vs diagonals.
export function keyDir(): { x: number; y: number } {
  let x = 0, y = 0;
  if (held.has('ArrowLeft')  || held.has('KeyA')) x -= 1;
  if (held.has('ArrowRight') || held.has('KeyD')) x += 1;
  if (held.has('ArrowUp')    || held.has('KeyW')) y -= 1;
  if (held.has('ArrowDown')  || held.has('KeyS')) y += 1;
  return { x, y };
}

export function isThrusting() {
  return held.has('ArrowLeft') || held.has('ArrowRight') ||
         held.has('ArrowUp')   || held.has('ArrowDown')  ||
         held.has('KeyA') || held.has('KeyD') || held.has('KeyW') || held.has('KeyS');
}
