# Handoff — psx-powerwash

**Read this before changing anything.** This is a feel toy first; a lot of values look arbitrary but were dialed in by hand in the original `prototype.html`. The original is preserved at the repo root for reference — diff against it before assuming a value is "wrong."

## Live

- **Deploy:** https://mynameiskonrad.github.io/psx-powerwash/
- **Repo:** https://github.com/MyNameIsKonrad/psx-powerwash
- **Reference prototype:** [prototype.html](prototype.html) (do not delete — this is the canonical "what good feels like" snapshot)

## Quick start

```bash
# install (the cache flag works around an EACCES on ~/.npm — see Gotchas)
npm install --cache=/tmp/npm-cache-pw

npm run dev          # vite dev server
npm run build        # tsc -b && vite build
npm run deploy       # builds and pushes dist/ to gh-pages branch
```

GitHub Pages is already configured to serve from the `gh-pages` branch. After `npm run deploy`, the build takes ~1–2 minutes to go live.

## DO NOT BREAK — preserved feel

These were iterated to feel right in the original prototype. If you find yourself "cleaning up" any of them, stop and read the brief.

- **Stream is always moving.** Free-flight at `freeSpeed`. Touch grabs and freezes its position; drag is 1:1 with grab offset preserved; release throws using a 180ms velocity window. **Do not lower `velWindowMs` below ~150** — finger velocity gets noisy and edge snap stops working on slow throws.
- **DVD-bounce off all four walls** with **±2° random nudge** so trajectories never become perfectly periodic.
- **Edge snap on release.** Tolerance scales with throw speed (`tan` slow, `tanFast` fast) — fast flicks have noisier finger velocity, so they need a more forgiving snap.
- **Tap-with-no-throw fallback.** Release with sub-`minThrowSpeed` velocity → random direction nudge so the stream never sits still.
- **Tile pop is instant.** No hitstop, no anticipation animation, no squash. These were tried and rejected — they made the game feel laggy.
- **Splash blending is normal, NOT additive.** Additive made it feel neon-glowy.
- **Splash alpha is stiff.** Hold 0.7 for 80% of life, then snap to 0. Smooth fade was tried and rejected — felt mushy.
- **All physics is dt-based in px/sec.** Never use per-frame deltas. Safari can ramp to 120Hz mid-session and naive code doubles speeds.
- **DPR capped at 2.** Beyond that, you pay a lot of fill cost for almost no perceptual gain on the chunky aesthetic.

## Module map

```
src/
  main.ts        bootstrap, resize/letterbox, main loop, input wiring, pause, Backquote/GUI-toggle, FPS
  config.ts      every tunable constant — single mutable object, lil-gui binds here
  effective.ts   config × upgrade mods → cached gameplay values, recomputed per frame
  stream.ts      stream physics, bounce, edge snap, thrustIntent (kbd/gamepad → thrust)
  input.ts       pointer (touch + mouse) → grab/drag/release; cornerTap; setInputEnabled
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

### Run flow
`beginNewRun() → playing → tickRun() drains water and watches destroyed% → won|lost → showEndScreen → showShop → beginNewRun()`. Physics is frozen when `run.state !== 'playing'` or `paused === true`.

### Save data (localStorage)
- `psxwash:save` — `{ currency, levels: { tank, pressure, nozzle, recovery, payout } }`
- `psxwash:presets` — `{ [name]: configSnapshot }` (named GUI presets)
- Wipe both via Debug → "wipe save" in the GUI.

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

- `stream.freeSpeed` — base wandering pace (default 280)
- `stream.eraseRadius` — how forgiving the stream is at hitting chunks (default 32)
- `stream.velWindowMs` — **don't go below 150**; raise to 220 if you want a punchier release
- `edgeSnap.tan` / `tanFast` — increase if rail-shots feel too rare
- `tiles.streamInherit` — >0.3 gets floppy; <0.1 looks too uniform
- `tiles.shrink` — higher = quicker disappear, lower = longer falling debris
- `splash.spawnHz` × `splash.life` — visible splash count is roughly product of these
- `run.tankSeconds` × `run.drainMultiplier` — tank length
- `run.cleanTargetPct` — win condition (default 80)
- `grid.chunkHp` — 1 keeps original feel, 2–3 is "scrub through layers"

## Gotchas

- **iCloud Drive path.** The repo lives in `~/Library/Mobile Documents/com~apple~CloudDocs/Claude/Code/psxwash`. Spaces in path → quote everything in shell commands. `node_modules` in iCloud occasionally hiccups; if a build acts strange, `rm -rf node_modules` and reinstall.
- **npm cache permission.** `~/.npm` had root-owned files from a past npm bug. We use `--cache=/tmp/npm-cache-pw` as a workaround. Permanent fix is `sudo chown -R 501:20 ~/.npm` (not done — needs the user to run sudo).
- **Vite `base`.** `vite.config.ts` has `base: '/psx-powerwash/'`. If the repo is renamed, update this and redeploy. GH Pages would 404 on assets otherwise.
- **gh-pages branch is auto-managed.** `npm run deploy` (uses the `gh-pages` package) force-pushes `dist/` to the `gh-pages` branch. Don't edit that branch by hand.
- **The original `prototype.html` is the source of truth for feel.** Open it in a browser side-by-side with the deployed app whenever you're worried something drifted.
- **`config.tsbuildinfo` is gitignored.** TypeScript will regenerate it.
- **Pause is gated to active runs only.** Pressing Esc on the end screen / shop is a no-op. This is intentional.
- **`tsconfig.json` has `noUnusedLocals: false`.** Loosened during the rapid build-out. Tighten back to `true` once code stabilizes.

## Open ideas (good for next sessions)

Roughly ordered by leverage:

1. **Audio.** Web Audio synthesized impact + splash + bounce sounds. The bounce callback in `splash.ts` is the natural hook (already has haptic; add audio alongside). No assets needed.
2. **Wall variety.** A `dirt-density` knob in init that pre-clears some cells with randomized noise/patterns. Would unlock 100s of "levels" worth of variety from one config knob. `grid.ts:initGrid` is the place.
3. **Combo/streak system.** Track consecutive destroys within a time window; multiplier feeds into currency award. The destroy callback in `damageGrid` is the hook; UI lives in `hud.ts`.
4. **Real upgrade effects beyond multipliers.** New mods plug into `effective.ts`. Think: pierce (continue damaging through chunks), spread (multi-cell radius shape), slow-mo on bounce (deliberate hitstop, brief and tasteful — different from the rejected gameplay hitstop).
5. **Touch joystick option.** A virtual stick on the bottom-left when no other modality is active. Slot into `thrustIntent()` — no other physics changes.
6. **Tune via URL params.** `?preset=stiff-feel` loads a named preset on boot. Useful for sharing playtest builds.
7. **Bigger walls / scroll camera.** If you outgrow 1280×720 of dirty, the play area can become bigger than the camera and scroll with the stream. Significant change — touches `main.ts`, `render.ts`, input conversion. Don't pre-build until you want it.
8. **Stricter TypeScript.** Re-enable `noUnusedLocals` and `noUnusedParameters` once iteration slows.

## Things that have been tried and rejected — do not re-suggest

- **Hitstop / freeze frames / anticipation animation on tile destroy** — felt laggy.
- **Additive blending on splash** — felt neon-glowy.
- **Smooth alpha fade on splash** — felt mushy.
- **Complex shadows / gradients on the stream** — broke the chunky aesthetic.
- **Per-frame physics deltas** — caused 120Hz speedup bug on Safari.

## When in doubt

1. Open `prototype.html` next to the deployed app.
2. If they don't match, the app drifted. Check what changed against the preserved-feel list above.
3. If the brief or this handoff disagrees with the code, the code wins (and update the docs).
