# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Read these first

This is a feel-driven prototype. Before changing gameplay code, read in this order:

1. `HANDOFF.md` — module map, architecture notes, "DO NOT BREAK" feel list, gotchas, and things already tried and rejected. This is the canonical guide.
2. `BRIEF.md` — original session brief with the design intent, phase plan, and the constants that produced the original good feel.
3. `prototype.html` — single-file canonical "what good feels like" snapshot. Open it side-by-side with the deployed app whenever a refactor might have caused drift. Do not delete it.

If `HANDOFF.md` disagrees with the code, the code wins — and update `HANDOFF.md` in the same change.

## Commands

```bash
# install — the cache flag works around a root-owned ~/.npm from a past npm bug
npm install --cache=/tmp/npm-cache-pw

npm run dev          # vite dev server (host: true, so reachable from phone on LAN)
npm run build        # tsc -b && vite build
npm run preview      # serve the built dist/
npm run deploy       # build and force-push dist/ to gh-pages branch (~1–2 min to go live)
```

There is no test suite, lint, or formatter configured. "Testing" means running `npm run dev` and feeling the prototype on a real device — desktop dev tools cannot validate touch feel. For UI changes, deploy and check on a phone before declaring done.

The deployed URL is https://mynameiskonrad.github.io/psx-powerwash/. GitHub Pages serves from the `gh-pages` branch — don't hand-edit that branch; `npm run deploy` manages it.

## Architecture

### Virtual coordinate system
Gameplay runs in a fixed virtual resolution (`config.display.virtualWidth × virtualHeight`, default 1280×720). The canvas is letterboxed inside the window. Pointer events go through `clientToVirtual` in `main.ts` before any gameplay code touches them.

**Never read `window.innerWidth/Height` from gameplay code.** Always use the `W` / `H` virtual dimensions threaded through from `main.ts`. DPR is capped at 2 — fill cost is real on phones and the chunky aesthetic doesn't benefit from more.

### config vs effective
- `src/config.ts` is the single mutable source of base tunables. lil-gui binds directly to it; presets snapshot/restore it via `JSON.parse(JSON.stringify(...))`.
- `src/effective.ts` caches `config × currentMods()` (upgrade multipliers) on a flat object, recomputed once per frame from `main.ts` via `recomputeEffective()`.
- Hot-loop gameplay reads `effective.freeSpeed`, `effective.eraseRadius`, `effective.eraseRadiusSq`, `effective.tankSeconds`, `effective.drainMultiplier`. Everything else reads `config.*` directly.
- New upgrades plug in by extending `currentMods()` in `upgrades.ts` and consuming the new field via `effective.ts`. Never mutate `config` from `upgrades.ts`.

### Thrust pipeline
`thrustIntent()` in `stream.ts` returns `{x, y, mag}` from whichever modality is active (keyboard → magnitude 1 binary; gamepad → 0..1 analog stick). One physics path applies acceleration + perpendicular brake + speed clamp. New modalities (touch joystick, MIDI, etc.) slot in by returning the same shape — no other physics changes needed.

### Run flow
`beginNewRun() → state='playing' → tickRun() drains water and watches destroyed% → 'won' | 'lost' → showEndScreen → showShop → beginNewRun()`.

Physics is frozen when `run.state !== 'playing'` or `paused === true`. Pause is intentionally gated to active runs — pressing Esc on the end screen or shop is a no-op.

### Save data (localStorage)
- `psxwash:save` — `{ currency, levels: { tank, pressure, nozzle, recovery, payout } }`
- `psxwash:presets` — `{ [name]: configSnapshot }` (named GUI presets)
- Wipe both via Debug → "wipe save" in the GUI.

### Module roles
See `HANDOFF.md` for the full module map. Briefly: `main.ts` bootstraps and owns the loop; `input.ts`/`keyboard.ts`/`gamepad.ts` produce intents; `stream.ts` is the only thing that mutates stream physics; `grid.ts` owns a `Uint8Array` of HP per cell; `tiles.ts` and `splash.ts` are post-destruction visuals; `render.ts` is the only canvas-drawing module; `gui.ts` is lil-gui setup and presets; `run.ts` is the win/lose state machine; `hud.ts` wraps DOM overlays; `upgrades.ts` is persistent currency + level state.

## Conventions

- **Vanilla TypeScript, no framework.** Functions over classes. Dependencies are `vite`, `typescript`, `lil-gui`, `gh-pages` — keep that list small.
- **All physics is dt-based in px/sec.** Never per-frame deltas. Safari can ramp to 120Hz mid-session and naive code doubles speeds. The main loop clamps `dt` to 0.05.
- **Tunables go in `config.ts`** as flat numeric/boolean properties grouped by system, with a comment recording the rough range that still feels right and *why* the value matters. Then expose in `gui.ts` with sensible min/max/step.
- **Comments explain *why*, not *what*.** The existing modules are good examples — match their density.
- `tsconfig.json` has `noUnusedLocals: false` / `noUnusedParameters: false` (loosened during the rapid build-out). Don't add `_` prefixes or `void x` calls just to satisfy lints that aren't on. Re-enabling these is a tracked open task in `HANDOFF.md`.

## Cross-platform input

| Action     | Touch              | Mouse           | Keyboard      | Gamepad         |
|------------|--------------------|-----------------|---------------|-----------------|
| Grab/throw | drag canvas        | left-drag       | —             | —               |
| Thrust     | —                  | —               | WASD / arrows | left stick      |
| Pause      | pause button       | pause button / Esc | Esc        | Start / Options |
| Restart    | restart button     | restart button / R | R          | Y / Triangle    |
| Tune GUI   | top-left 80×80 tap | top-left / `` ` `` | `` ` ``    | X / Square      |

Hint text under the canvas adapts to detected modalities and updates on `gamepadconnected` / `gamepaddisconnected`.

## Do not break (feel)

The full list with rationale is in `HANDOFF.md`. The headline items:

- Stream is always moving. `velWindowMs` must stay ≥ ~150 — finger velocity gets noisy below that and edge snap stops working on slow throws.
- DVD-bounce off all four walls with ±2° random nudge so trajectories never become perfectly periodic.
- Edge snap tolerance scales with throw speed (fast flicks need a more forgiving snap).
- Tap-with-no-throw fallback: release with sub-`minThrowSpeed` velocity → random direction nudge.
- Tile pop is instant — no hitstop, no anticipation, no squash.
- Splash blending is **normal, not additive**. Alpha is **stiff, not smooth** (hold 0.7 for 80% of life, snap to 0).

## Already tried and rejected — do not re-suggest

- Hitstop / freeze frames / anticipation animation on tile destroy (felt laggy)
- Additive blending on splash (felt neon-glowy)
- Smooth alpha fade on splash (felt mushy)
- Complex shadows / gradients on the stream (broke the chunky aesthetic)
- Per-frame physics deltas (caused 120Hz speedup bug on Safari)

## Gotchas

- **Vite `base` is hardcoded** in `vite.config.ts` to `/psx-powerwash/`. If the repo is renamed, update this and redeploy or GH Pages 404s on assets.
- **`gh-pages` branch is auto-managed** by `npm run deploy`. Don't edit by hand.
- **npm cache permission.** `~/.npm` may have root-owned files; the `--cache=/tmp/npm-cache-pw` flag is the standing workaround.
- **Pause is gated to `run.state === 'playing'`** — Esc on end screen / shop is intentionally a no-op.
