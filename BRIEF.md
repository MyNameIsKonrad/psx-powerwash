# Powerwash Prototype — Claude Code Brief

## Quick start prompt (paste this into Claude Code first)

> Read BRIEF.md and prototype.html in this directory. Then execute Phase 1 of the brief end-to-end: set up a Vite TypeScript project, modularize the code from prototype.html into the structure described in the brief, and configure GitHub Pages deploy. When Phase 1 is complete, deploy it, give me the URL, and wait for me to confirm the deployed version feels identical to the original prototype.html on my phone before starting Phase 2. Then proceed sequentially through Phases 2, 3, 4, 5, asking for confirmation between each phase. Be ambitious — I want this session to be substantial.

---

## Project context

This is a mobile-first 2D arcade prototype combining "active incremental" gameplay (Nodebuster-style short runs + upgrades) with a power-washing core fantasy (Powerwash Simulator-style satisfaction). The visual reference is Cloverpit — chunky PSX-style aesthetic, snappy crisp animations, no anticipation lag.

The current `prototype.html` has the core mechanic dialed in through extensive iteration. It is a feel toy, not yet a game. Your job is to graduate it to a real project: proper repo, modular code, live tuning UI, first-pass run loop, deployed.

## Core mechanic — DO NOT BREAK

These behaviors are the result of careful iteration. Preserve their feel through any refactor:

- **Stream is always moving.** Touch grabs the stream and freezes its position; drag controls 1:1 (with grab offset preserved); release throws using the finger's recent velocity over a 180ms window.
- **DVD-bounce off play-area edges.** Stream bounces off all four walls.
- **Frame-rate independent.** All movement is dt-based in px/sec. Never use per-frame deltas. Safari can ramp to 120Hz mid-session and break naive implementations.
- **Edge snap on release.** When throwing near an edge with a roughly-parallel angle, velocity snaps to perfectly parallel. Tolerance scales with throw speed (slow throws get tight tolerance, fast scratchy throws get generous tolerance — fast flicks have noisier finger-velocity).
- **Bounce nudge.** Each bounce adds ±2° random angle to break perfectly-periodic trajectories.
- **Tap-with-no-throw fallback.** If you release with near-zero velocity, the stream gets a random direction nudge so it doesn't sit still.
- **Chunk grid.** Background is a grid of black chunks; stream destroys them on contact (1 HP currently, may become layered HP later).
- **Tile pop.** Each destroyed chunk launches as a physical square with rotation + gravity + scale-shrink. No hitstop, no anticipation — instant launch with stiff disappear.
- **Splash visual.** Light blue rotated rectangles spawn at the stream position at high frequency, expand and fade rapidly with a stiff alpha curve (hold then snap, NOT smooth fade). Normal blending, NOT additive — additive made it feel neon-glowy.

## Priorities

### Phase 1 — Repo setup
- Initialize Vite + TypeScript (vanilla, no React/Vue/etc.)
- Module structure under `src/`:
  - `main.ts` — bootstrap, canvas setup, resize handling, main loop
  - `input.ts` — touch/mouse → grab/drag/release events
  - `stream.ts` — stream state, free-flight physics, edge snap on release, bounce nudge
  - `grid.ts` — chunk grid, hit detection, reset
  - `tiles.ts` — flying tile spawn + physics + lifecycle
  - `splash.ts` — splash spawn + lifetime
  - `render.ts` — all rendering (or split if it grows)
  - `config.ts` — every tunable constant exported as a single object
- GitHub Pages deploy via the standard Vite + gh-pages setup. The user has done this with another project (Medikinetics). Use a simple `npm run deploy` script.
- Repo name: ask the user. Default suggestion: `powerwash-prototype`.
- Set Vite `base` correctly for GH Pages subpath.
- Confirm deployed version runs on mobile before proceeding.

### Phase 2 — Live tuning UI
- Add `lil-gui` (lightweight, mobile-friendly).
- Expose every constant from `config.ts` as a slider with sensible min/max/step.
- Group by system: Stream, Grid, Tiles, Splash, Edge Snap, Bounce.
- For each constant, include a comment about what it does and a recommended range.
- Save/load preset slots to localStorage (named, e.g. "stiff-feel", "bouncy-test").
- "Reset to defaults" button.
- Tap top-left corner of canvas to toggle GUI visibility (so it's not always covering the play area on mobile).

### Phase 3 — Run loop
- Water tank (starts at 100%, depletes over time while stream is active — make depletion rate configurable).
- "Clean %" target (e.g. complete at 80% chunks destroyed).
- End screen: time taken, % cleaned, water remaining, currency awarded.
- Restart button.
- Make tank size, target %, and depletion rate all configurable in the GUI.

### Phase 4 — Currency + upgrade scaffold
- Currency persists in localStorage.
- Award currency proportional to % cleaned and water efficiency.
- Upgrade screen between runs (scaffold only — the actual upgrades can be stubbed/named with no logic). Show: tank size, stream pressure, nozzle width, etc. Even just buttons that do nothing yet establishes the structure for later.
- "Start run" button returns to the play area.

### Phase 5 — Performance + polish
- Profile on mobile (use the deployed URL on the user's actual phone, not just desktop dev tools).
- Verify stable 60fps with hundreds of tiles + splashes simultaneously.
- No memory leaks across many runs.
- Touch events still don't conflict with browser scroll/zoom (current code handles this; preserve).

## Coding style
- Vanilla TypeScript, no framework.
- Functions over classes where reasonable; this is not OOP-heavy.
- All tunable constants in `config.ts` as a single mutable object that lil-gui binds to.
- Comments explain *why*, not *what*.
- Keep dependencies minimal: `vite`, `typescript`, `lil-gui`, `gh-pages` is the whole list.

## Constants in current prototype

All currently in the single HTML file under `// === STREAM STATE ===` and `// === PARTICLES ===`. Extract these into `config.ts`. Notable values that produce the current good feel:

```
Stream:
  FREE_SPEED         280   px/sec
  ERASE_RADIUS       32    px
  MAX_THROW_SPEED    1800
  MIN_THROW_SPEED    120
  VEL_WINDOW_MS      180   ← critical, do not lower below ~150
  BOUNCE_NUDGE_RAD   ~0.035 (2°)

Edge snap:
  EDGE_SNAP_DIST     60
  EDGE_SNAP_TAN      0.36  (~20°, slow throws)
  EDGE_SNAP_TAN_FAST 0.7   (~35°, fast throws)

Grid:
  CHUNK_SIZE   22
  CHUNK_GAP    1

Tiles:
  TILE_GRAVITY        2600
  TILE_KNOCK_BASE     110
  TILE_KNOCK_VAR      55
  TILE_STREAM_INHERIT 0.18
  TILE_ROT_MAX        6
  TILE_SHRINK         2.4
  upward kick         -50  (in spawn function)
  NO HITSTOP / NO SQUASH — these were tried and rejected.

Splash:
  SPAWN_HZ      50
  LIFE          0.15
  START_SIZE    12
  END_SIZE      36
  LINE_WIDTH    2
  JITTER        14
  COLOR         (124, 196, 255)
  Stiff alpha curve: holds 0.7 alpha for 80% of life, snaps to 0 in last 20%.
  Normal blending, NOT additive.

Wall color:
  #6e7884 (mid slate-gray — chosen so light blue splash has contrast).
```

## What "done" looks like for this session
- Deployed URL the user can open on phone any time.
- Live tuning UI works on mobile, can save/load named presets.
- Basic run loop functional — start, clean wall, succeed or run out of water, end screen, restart.
- Phase 1–3 mandatory; Phase 4 strongly desired; Phase 5 if time permits.

## Things to avoid
- Reintroducing hitstop / freeze frames / anticipation animation — already tried, made the game feel laggy.
- Additive blending on splash — already tried, made it feel neon-glowy.
- Complex shadow/gradient effects on the stream — broke the chunky aesthetic.
- Per-frame physics deltas — caused 120Hz speedup bug on Safari.
- Overengineering the upgrade system before the run loop is fun.
