# Architecture — psx-powerwash

**Read this before changing anything.** When evaluating a change, the question is always: *does this serve the powerwash fantasy?* Not: "was this value tuned in the prototype?"

## Core fantasy

> Pressurized water stream aimed at a dirty wall. You grab the hose, drag it across the surface, throw it at an angle, feel the resistance of stubborn grime. The stream can idle against a surface. The dirt pops cleanly and definitively. It reads like human hands controlling a heavy thing.

This is the acceptance criterion for every feel decision. If a change makes it feel more like that, it's right. If it makes it feel more like a physics toy or a marble game, reconsider.

`prototype.html` was the source of truth for an earlier, different fantasy (bouncing marble ball). It's preserved at the repo root for reference but is **no longer the baseline**. `effective.ts` is the calibration source now.

## Live

- **Deploy:** https://mynameiskonrad.github.io/psx-powerwash/
- **Repo:** https://github.com/MyNameIsKonrad/psx-powerwash

## Quick start

```bash
# install (the cache flag works around an EACCES on ~/.npm — see Gotchas)
npm install --cache=/tmp/npm-cache-pw

npm run dev          # vite dev server
npm run build        # tsc -b && vite build
npm run deploy       # builds and pushes dist/ to gh-pages branch
```

GitHub Pages is already configured to serve from the `gh-pages` branch. After `npm run deploy`, the build takes ~1–2 minutes to go live.

## Current state (2026-05-13)

Physics sandbox active on `main` (shop/HUD/meta-game stripped). Stream bounces, tiles pop, R resets, backtick opens lil-gui. Full-featured state preserved on `prototype-modules` branch. Responsive sizing and physics auto-scaling landed; `effective.ts` handles all px-based calibration.

## Feel principles — check these before changing physics

These are grounded in the powerwash fantasy, not in the prototype. A change that violates them needs a good reason; a change that serves the fantasy overrides them.

- **Destruction is instant and clean.** Chunks pop — no hitstop, anticipation, or squash. Tried and rejected; they made it feel laggy and gamey, not physical.
- **Water looks like water.** Splash blending is normal (not additive — that looked neon). Splash alpha is stiff: hold 0.7 for 80% of life, snap to 0. Smooth fade was tried and rejected — felt mushy.
- **Throw feel matters.** `velWindowMs` should not go below ~150 — finger velocity gets noisy and edge snap stops working. Edge snap tolerance scales with throw speed (fast flicks are noisier, need more forgiveness).
- **The stream can stop.** A hose pressed into a surface doesn't need to keep moving. Coast-to-rest is fine; a stream sitting still against a stubborn chunk is good powerwash fantasy.

## Technical constraints — do not touch without understanding why

- **All physics is dt-based in px/sec.** Never use per-frame deltas. Safari can ramp to 120Hz mid-session.
- **DPR capped at 2.** Beyond that, fill cost rises sharply with no perceptual gain on the chunky aesthetic.

## Module map

```
src/
  main.ts        bootstrap, resize/letterbox, main loop, input wiring, pause, Backquote/GUI-toggle
  config.ts      every tunable constant — single mutable object, lil-gui binds here
  effective.ts   config × upgrade mods → cached gameplay values, recomputed per frame
  stream.ts      stream physics, bounce, edge snap, thrustIntent (kbd/gamepad → thrust)
  input.ts       pointer (touch + mouse) → grab/drag/release; cornerTap; setInputEnabled
  keyboard.ts    held-keys set, keyDir(), Esc/R handlers
  gamepad.ts     polled per frame; left stick → analog thrust, buttons → pause/restart/GUI
  grid.ts        Float32Array of HP per cell (dt-based), damageGrid, destroyedCount
  tiles.ts       flying tile chunks (post-destruction physics)
  splash.ts      water-impact rectangles + bounce splash + haptic
  render.ts      all canvas drawing
  gui.ts         lil-gui setup, preset save/load, debug folder (currently unused in main loop)
  run.ts         run state machine (untouched; non-core)
  hud.ts         HUD elements, end screen, shop overlay (currently unused in main loop)
  upgrades.ts    persistent currency/levels, cost growth, currentMods() (currently unused in main loop)
```

## Architecture notes

### Coordinate system
Gameplay runs in a fixed virtual resolution (`config.display.virtualWidth × virtualHeight`, default 1280×720). The canvas is letterboxed inside the window. Pointer events are converted client→virtual via `clientToVirtual` in `main.ts`. **Never read `window.innerWidth/Height` from gameplay code** — always use `W`/`H` (virtual) passed through.

### Config vs effective
- `config.*` is what lil-gui edits and what `presets` snapshot/restore.
- `effective.*` is `config × currentMods()` (upgrade multipliers), recomputed every frame in `main.ts`.
- Gameplay code reads `effective.freeSpeed`, `effective.eraseRadius`, `effective.tankSeconds`, `effective.drainMultiplier`. Everything else reads `config.*` directly.
- If you add a new upgrade that should affect gameplay, add it to `currentMods()` in `upgrades.ts` and consume it via `effective.ts`. Don't mutate `config` from `upgrades.ts`.

### Thrust pipeline (cross-platform)
`thrustIntent()` in `stream.ts` returns `{x, y, mag}` from whichever modality is active:
- Keyboard → magnitude 1 (binary), direction from WASD/arrows
- Gamepad → magnitude 0..1 (analog), direction from left stick

One physics path applies thrust + perpendicular brake + speed clamp. To add a new modality (touch joystick, MIDI, etc.), make it return the same shape and slot it into `thrustIntent()`.

### Save data (localStorage)
- `psxwash:save` — `{ currency, levels: { tank, pressure, nozzle, recovery, payout } }` (untouched by current physics loop)
- `psxwash:presets` — `{ [name]: configSnapshot }` (named GUI presets, still functional)
- Wipe both via Debug → "wipe save" in the GUI (when shop/upgrades are re-integrated).

## Cross-platform input summary

| Action       | Touch                    | Mouse           | Keyboard      | Gamepad         |
|--------------|--------------------------|-----------------|---------------|-----------------|
| Grab/throw   | drag canvas              | left-drag       | —             | —               |
| Thrust       | —                        | —               | WASD / arrows | left stick      |
| Pause        | tap `pause` button       | tap `pause` button / Esc | Esc           | Start / Options |
| Restart      | tap `restart` button     | tap `restart` button / R | R             | Y / Triangle    |
| Tune GUI     | tap top-left 80×80       | tap top-left / `` ` ``    | `` ` ``       | X / Square      |

The hint text at the bottom of the screen adapts to detected modalities (recomputed on `gamepadconnected`/`gamepaddisconnected`).

## Tuning knobs that move feel the most

These are the ones to reach for first when balancing. All in `config.ts` and exposed in lil-gui.

- `stream.drag` — velocity decay per second in free flight (default 0.15). Increase for quicker coast-to-rest, decrease for longer glide.
- `stream.eraseRadius` — how forgiving the stream is at hitting chunks (default 32)
- `stream.velWindowMs` — **don't go below 150**; raise to 220 if you want a punchier release
- `edgeSnap.tan` / `tanFast` — increase if rail-shots feel too rare
- `grid.surfaceResistance` — seconds to clear one chunk at default pressure (default 5). Higher = tougher/more satisfying to break through.
- `grid.hardness` — summed repulsion force from live chunks, scales proximity × hp-fraction (default 0, off). Increase to make wall push back harder; >0.3 feels aggressive.
- `tiles.streamInherit` — >0.3 gets floppy; <0.1 looks too uniform
- `tiles.shrink` — higher = quicker disappear, lower = longer falling debris
- `splash.spawnHz` × `splash.life` — visible splash count is roughly product of these

## Gotchas

- **Repo path.** Lives in `~/code/psx-powerwash` (not iCloud — iCloud-synced node_modules caused hiccups during early prototyping).
- **npm cache permission.** `~/.npm` had root-owned files from a past npm bug. We use `--cache=/tmp/npm-cache-pw` as a workaround. Permanent fix is `sudo chown -R 501:20 ~/.npm` (not done — needs the user to run sudo).
- **Vite `base`.** `vite.config.ts` has `base: '/psx-powerwash/'`. If the repo is renamed, update this and redeploy. GH Pages would 404 on assets otherwise.
- **gh-pages branch is auto-managed.** `npm run deploy` (uses the `gh-pages` package) force-pushes `dist/` to the `gh-pages` branch. Don't edit that branch by hand.
- **`prototype.html` is no longer the feel reference.** It captures an earlier fantasy (bouncing marble). The current fantasy is the powerwash stream — see top of this doc. Preserved at the repo root for historical reference.
- **`config.tsbuildinfo` is gitignored.** TypeScript will regenerate it.
- **Pause is gated to active runs only.** Pressing Esc on the end screen / shop is a no-op. (Currently disabled since run loop is stripped; re-enable when run loop returns.)
- **`tsconfig.json` has `noUnusedLocals: false`.** Loosened during the rapid build-out. Tighten back to `true` once code stabilizes.

## Roadmap

Active multi-phase plan. Check items off as they ship. When a whole phase lands, move it under "Done" with the date. Filter every decision against the powerwash fantasy stated at the top of this doc.

### Phase 1 — Physics foundation (active)

One PR. The float-HP type change ripples through several files; do it together.

- [x] **dt-based damage.** `grid.data: Uint8Array → Float32Array`. `damageGrid` deals `damageRate * dt` per frame instead of integer 1. Destroy when `hp <= 0`.
- [x] **Render gradient.** Rewrite `colorCache` in `render.ts` — 64-step LUT keyed on `hp / maxHp` fraction.
- [x] **`destroyedCount` comparison.** Change `d[i] === 0` to `d[i] <= 0`.
- [x] **Config rename.** `grid.chunkHp → grid.surfaceResistance` (seconds-to-clear at default pressure). Add `grid.damageRate` (HP/sec, default 2). Updated gui.ts label.
- [x] **Effective wiring.** Expose `damageRate` through `effective.ts` for future pressure-upgrade compatibility.
- [x] **Drag tunable.** `config.stream.drag` (default 0.15). Applied in `updateStream` in free flight when no thrust active.
- [x] **Remove tap-with-no-throw fallback** in `input.ts`. Sub-threshold release now rests the stream at zero velocity.
- [x] **Keep `freeSpeed`** as a tunable; no longer applied as a floor.
- [x] **Default 5 layers.** `grid.surfaceResistance: 5`.
- [x] **Acceptance:** build clean; stream coasts and rests; chunks layer visibly under sustained contact; no console errors.

### Phase 2 — Surface feel

Builds on Phase 1. Delivers the pressure-feel exploration.

- [x] **Hardness / resist.** `config.grid.hardness` (0..1). Repulsion accumulated per chunk (proximity × hp-fraction weighted), applied as summed velocity delta after loop.
- [x] **Expose `surfaceHardness`** through `effective.ts`.
- [x] **Random rotation + scale.** `grid.rot` and `grid.scaleFactor` Float32Arrays; `reseedSurface()` randomizes without touching HP; render applies per-chunk transform.
- [x] **Randomize button** in Grid folder of gui.
- [x] **Acceptance:** build clean; wall reads organic; hardness tunable in gui; no console errors.

### Phase 3 — UI polish

Independent of Phases 1–2.

- [x] **lil-gui regroup.** Feel / Surface / Visual / Input / Meta. Feel and Surface open; Edge Snap, Flying Tiles, others collapsed.
- [x] **lil-gui touch styling.** CSS injected at setup — row-height 38px, font 13px, dark industrial palette matching game.
- [x] **Hide `#hint`** on touch via CSS media query `(hover: none) and (pointer: coarse)`.
- [x] **Pause overlay:** tap-anywhere-to-resume (pointer-events: auto on .show); "paused / tap · esc · start" copy.
- [x] **Aesthetic pass:** all backdrop-filter blurs removed; buttons flat dark chips (border-radius 4px); palette from game wall color.

### Phase 4 — Docs cleanup

10 minutes after Phase 3.

- [x] Update Tuning section below: replace `chunkHp` with `surfaceResistance`, document `drag` and `hardness`.
- [x] Clear stale entries from NOTES.md (sunset prototype: done; freeSpeed removal: done; powerwash framing: done).
- [x] BRIEF.md already removed in prior commit.

### Done

**Phase 1 — 2026-05-13.** dt-based damage (Float32Array HP, frame-rate independent), coast-to-rest with drag tunable (0.15 default), tap-with-no-throw fallback removed, `chunkHp → surfaceResistance`, `damageRate` added, 5-layer default.

**Phase 2 — 2026-05-13.** Hardness/resist tunable (summed repulsion force from live chunks, SCALE=500), random chunk rotation + scale (`grid.rot`, `grid.scaleFactor`), `reseedSurface()` + randomize button in gui.

**Phase 3 — 2026-05-13.** lil-gui restructured (Feel/Surface/Visual/Input/Meta), touch-friendly CSS injected, all backdrop-filter blurs removed, buttons flattened to dark industrial chips, pause overlay tap-to-resume, hint hidden on touch via media query.

**Phase 4 — 2026-05-13.** Tuning section documented (`drag`, `hardness`, `surfaceResistance`), stale NOTES.md entries cleared, historical context preserved.

### Parking lot (good ideas, not blocking the current arc)

These are for after the physics/feel arc settles. Don't pull them into the current phases.

1. **Re-implement run loop, HUD, end screen, shop.** Old code is preserved in modules; hook back into `main.ts` once feel is locked.
2. **Audio.** Web Audio synthesized impact + splash + bounce. Hook into the `splash.ts` bounce callback (already has haptic). Natural companion to the pressure-feel work.
3. **Wall variety.** `dirt-density` knob pre-clears cells with noise/patterns. Unlocks "levels" worth of variety from one config knob.
4. **Combo/streak system.** Hook into the destroy callback in `damageGrid`.
5. **Upgrade effects beyond multipliers.** Pierce, spread, deliberate slow-mo on bounce (tasteful, different from the rejected gameplay hitstop).
6. **Touch joystick option.** Slot into `thrustIntent()` — no other physics changes.
7. **Tune via URL params.** `?preset=stiff-feel` for sharing playtest builds.
8. **Bigger walls / scroll camera.** Significant — defer until clearly wanted.
9. **Stricter TypeScript.** Re-enable `noUnusedLocals` / `noUnusedParameters` once iteration slows.

## Things that have been tried and rejected — do not re-suggest

- **Hitstop / freeze frames / anticipation animation on tile destroy** — felt laggy.
- **Additive blending on splash** — felt neon-glowy.
- **Smooth alpha fade on splash** — felt mushy.
- **Complex shadows / gradients on the stream** — broke the chunky aesthetic.
- **Per-frame physics deltas** — caused 120Hz speedup bug on Safari.

## When in doubt

1. Re-read the **Core fantasy** at the top. Does the change in question move the build toward that, or away?
2. Check the **Feel principles** section. A change can violate them, but it needs a fantasy-grounded reason.
3. If this doc disagrees with the code, the code wins — update this doc.
