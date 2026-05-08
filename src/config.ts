// Single mutable config — all tunable constants live here. lil-gui will bind
// directly against this object in Phase 2, so prefer flat numeric/boolean
// properties grouped by system. Comments record *why* a value matters and the
// rough range that still feels right (from the prototype iteration).

export const config = {
  stream: {
    // Free-flight speed when not held / on tap-with-no-throw.
    freeSpeed: 280,            // px/sec — 200-400 reasonable
    eraseRadius: 32,           // px — chunks inside this disc get destroyed
    maxThrowSpeed: 1800,       // hard clamp on throw flicks
    minThrowSpeed: 120,        // below this, treat release as a stillness tap
    // Velocity sample window: do not lower below ~150ms — finger-velocity
    // becomes noisy and edge snap stops working on slow throws.
    velWindowMs: 180,
    // Random ±angle added on every wall bounce to break perfectly-periodic loops.
    bounceNudgeRad: 2 * Math.PI / 180, // 2°
  },

  edgeSnap: {
    dist: 60,        // px from wall — only snap when stream is this close
    tan: 0.36,       // ~20° tolerance for slow throws (tighter)
    tanFast: 0.7,    // ~35° tolerance at max throw speed (forgiving — flicks are noisy)
  },

  grid: {
    chunkSize: 22,   // px per chunk cell
    chunkGap: 1,     // visual gap inside the cell
    // Hits required to destroy a chunk. >1 produces a layered "scrubbing"
    // feel — chunks lighten through the dirt palette before popping.
    chunkHp: 1,
  },

  tiles: {
    gravity: 2600,         // px/sec^2 — heavy, snappy fall
    knockBase: 110,        // base launch speed away from stream center
    knockVar: 55,          // variance — keep low for uniform breaks
    streamInherit: 0.18,   // 0..1 share of stream velocity inherited; >0.3 felt floppy
    rotMax: 6,             // rad/sec max angular velocity; >8 felt cartoon
    shrink: 2.4,           // scale units per second; higher = quicker disappear
    upwardKick: -50,       // small initial upward velocity (negative = up)
  },

  splash: {
    spawnHz: 50,        // splashes/sec while stream is active
    life: 0.15,         // sec — short and stiff
    startSize: 12,      // px at spawn
    endSize: 36,        // px at death
    lineWidth: 2,
    jitter: 14,         // px random offset around stream
    r: 124, g: 196, b: 255, // light blue stroke (rgb)
    // alpha hold/snap shape is hardcoded in render.ts: hold 0.7 for 80% of
    // life, snap to 0 in last 20%. Smooth fade was tried and rejected.
  },

  wallColor: '#6e7884', // mid slate-gray — picked so light blue splash has contrast

  display: {
    // Fixed virtual resolution. The canvas is letterboxed inside the window —
    // gameplay coordinates always run in this space, so feel is identical
    // on a 4K monitor and a phone. 1280x720 keeps tile counts reasonable.
    virtualWidth: 1280,
    virtualHeight: 720,
    // Background color around the letterbox bars.
    letterbox: '#06080b',
  },

  keyboard: {
    // WASD / arrow thrust for desktop play. Acceleration (px/sec²) is
    // applied each frame the key is held; speed is then clamped.
    accel: 2400,
    maxSpeed: 900,
    // While any thrust key is held, brake the perpendicular component so the
    // stream feels responsive instead of orbiting forever. 0 = no brake,
    // 1 = full kill in one second.
    perpBrake: 3.5,
  },

  run: {
    // Seconds the tank lasts at full pressure with a drain multiplier of 1.0.
    // Drain is continuous because the stream is always on; the user manages it
    // by hitting more chunks per second of water.
    tankSeconds: 30,
    // Win threshold: % of chunks destroyed.
    cleanTargetPct: 80,
    // Multiplier on tank drain (debug knob — set to 0 to never lose water).
    drainMultiplier: 1.0,
  },
};

export type Config = typeof config;
