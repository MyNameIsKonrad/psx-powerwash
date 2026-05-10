# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Read these first

- `HANDOFF.md` — current architecture, gotchas, tried-and-rejected list, save-data shapes. Source of truth for "how this code is organized today."
- `BRIEF.md` — original design brief and the iterated constants that produce the good feel.
- `prototype.html` — the canonical "what good feels like" snapshot, preserved at the repo root. Open it next to the dev build whenever you suspect feel drift. Do **not** delete it.

If `HANDOFF.md` and the code disagree, the code wins — and update the handoff.

## Commands

```bash
npm install --cache=/tmp/npm-cache-pw   # workaround for an EACCES on ~/.npm
npm run dev                              # vite dev server
npm run build                            # tsc -b && vite build
npm run deploy                           # builds and force-pushes dist/ to gh-pages branch
```

There is no test runner, linter, or formatter configured. `tsc -b` (run as part of `build`) is the only correctness check.

`vite.config.ts` sets `base: '/psx-powerwash/'` for GitHub Pages. If the repo is renamed, update this string before deploying or assets will 404.

## Architecture

Vanilla TypeScript + Vite, no framework. Functions over classes. Single mutable `config` object that lil-gui binds to.

### Coordinate system

Gameplay runs in a fixed virtual resolution (`config.display.virtualWidth × virtualHeight`, default 1280×720). The canvas is letterboxed inside the window; pointer events are converted client→virtual via `clientToVirtual` in `main.ts`. Gameplay code must use the virtual `W`/`H` passed through — never read `window.innerWidth/Height`.

DPR is capped at 2 (more fill cost, no perceptual gain on the chunky aesthetic).

### Config → effective → consumers

- `config.ts` — every tunable constant, single mutable object. lil-gui edits it; preset save/load snapshots it.
- `upgrades.ts` — persistent currency + levels in localStorage. `currentMods()` returns multiplier values.
- `effective.ts` — `config × currentMods()`, recomputed once per frame from `main.ts`. Hot-loop consumers (`stream.ts`, `grid.ts`, `run.ts`) read `effective.freeSpeed`, `effective.eraseRadius`, `effective.tankSeconds`, `effective.drainMultiplier`. Everything else reads `config.*` directly.

When adding an upgrade that affects gameplay: add it to `currentMods()`, consume it via `effective.ts`. Do not mutate `config` from `upgrades.ts`.

### Thrust pipeline (cross-platform input)

`thrustIntent()` in `stream.ts` returns `{x, y, mag}` from whichever modality is active (keyboard binary, gamepad analog). One physics path applies thrust + perpendicular brake + speed clamp. New input modalities (touch joystick, MIDI…) plug in by returning the same shape.

Pointer drag (touch + mouse) is a separate path handled by `input.ts` — grab-and-throw, not thrust.

### Run flow

`beginNewRun() → playing → tickRun() drains water and watches destroyed% → won|lost → showEndScreen → showShop → beginNewRun()`. Physics is frozen when `run.state !== 'playing'` or `paused === true`. Pause is intentionally gated to active runs only — Esc on the end screen / shop is a no-op.

### Module map

```
main.ts        bootstrap, resize/letterbox, main loop, input wiring, pause, Backquote/GUI-toggle, FPS
config.ts      every tunable constant — the lil-gui binding target
effective.ts   config × upgrade mods → cached gameplay values, recomputed per frame
stream.ts      stream physics, bounce, edge snap, thrustIntent (kbd/gamepad → thrust)
input.ts      pointer (touch + mouse) → grab/drag/release; cornerTap; setInputEnabled
keyboard.ts    held-keys set, keyDir(), Esc/R handlers
gamepad.ts     polled per frame; left stick → analog thrust, buttons → pause/restart/GUI
grid.ts        Uint8Array of HP per cell, damageGrid, destroyedCount
tiles.ts       flying tile chunks (post-destruction physics)
splash.ts      water-impact rectangles + bounce splash + haptic
render.ts      all canvas drawing
gui.ts         lil-gui setup, preset save/load, debug folder
run.ts         run state machine (playing/won/lost), water drain, win/lose checks
hud.ts         HUD elements, end screen, shop overlay, FPS, overlay-open class
upgrades.ts    persistent currency/levels, cost growth, currentMods()
```

### localStorage keys

- `psxwash:save` — `{ currency, levels: { tank, pressure, nozzle, recovery, payout } }`
- `psxwash:presets` — `{ [name]: configSnapshot }` (named GUI presets)

Wipe both via Debug → "wipe save" in the GUI.

## Preserved-feel invariants — DO NOT BREAK

These were iterated to feel right. If you find yourself "cleaning up" any of them, stop and re-read `HANDOFF.md`.

- **All physics is dt-based in px/sec.** Never per-frame deltas. Safari can ramp to 120Hz mid-session and naive code doubles speeds.
- **Stream is always moving.** Touch grabs and freezes its position; drag is 1:1 with grab offset preserved; release throws using a 180ms velocity window. Do not lower `velWindowMs` below ~150 — finger velocity gets noisy and edge snap stops working on slow throws.
- **DVD-bounce off all four walls** with **±2° random nudge** so trajectories never become perfectly periodic.
- **Edge snap on release.** Tolerance scales with throw speed (`tan` slow, `tanFast` fast) — fast flicks have noisier finger velocity, so they need a more forgiving snap.
- **Tap-with-no-throw fallback.** Sub-`minThrowSpeed` release → random direction nudge so the stream never sits still.
- **Tile pop is instant.** No hitstop, no anticipation, no squash.
- **Splash blending is normal, NOT additive.** Alpha is stiff: hold 0.7 for 80% of life, then snap to 0.

## Tried and rejected — do not re-suggest

- Hitstop / freeze frames / anticipation animation on tile destroy — felt laggy.
- Additive blending on splash — felt neon-glowy.
- Smooth alpha fade on splash — felt mushy.
- Complex shadows / gradients on the stream — broke the chunky aesthetic.
- Per-frame physics deltas — caused 120Hz speedup bug on Safari.

## Style notes

- Vanilla TS, no framework. Functions over classes.
- Dependencies are deliberately minimal: `vite`, `typescript`, `lil-gui`, `gh-pages`. Don't add more without a strong reason.
- `tsconfig.json` has `noUnusedLocals: false` / `noUnusedParameters: false` — loosened during the rapid build-out.
- Comments explain *why*, not *what*.
