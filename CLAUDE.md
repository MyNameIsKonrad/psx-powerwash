# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Read these first

- `ARCHITECTURE.md` — how the code is organized today: module map, coordinate system, config/effective split, thrust pipeline, save data shapes, gotchas, tried-rejected list. Source of truth for "how this code works."
- `HANDOFF.md` — where you left off last session (written by `/handoff`).
- `NOTES.md` — your notes to self (appended by `/note`).
- `BRIEF.md` — original design brief. Historical reference; the core fantasy has since shifted to powerwash (see ARCHITECTURE.md).
- `prototype.html` — preserved at the repo root but no longer the feel reference. `effective.ts` is the calibration baseline now.

If ARCHITECTURE.md and the code disagree, the code wins — and update ARCHITECTURE.md.

## Commands

```bash
npm install --cache=/tmp/npm-cache-pw   # workaround for an EACCES on ~/.npm
npm run dev                              # vite dev server
npm run build                            # tsc -b && vite build
npm run deploy                           # builds and force-pushes dist/ to gh-pages branch
```

There is no test runner, linter, or formatter configured. `tsc -b` (run as part of `build`) is the only correctness check.

## Feel principles (full context in ARCHITECTURE.md)

Ask: *does this serve the powerwash fantasy?* That's the filter, not "was this dialed in the prototype."

- **All physics is dt-based in px/sec.** Never per-frame deltas (Safari can ramp to 120Hz mid-session).
- **Don't lower `velWindowMs` below ~150.** Finger velocity gets noisy; edge snap breaks.
- **Tile pop is instant.** No hitstop, no anticipation, no squash.
- **Splash blending is normal, NOT additive.** Alpha is stiff (hold 0.7 then snap to 0).

## Style notes

- Vanilla TS, no framework. Functions over classes.
- Dependencies are deliberately minimal: `vite`, `typescript`, `lil-gui`, `gh-pages`. Don't add more without a strong reason.
- `tsconfig.json` has `noUnusedLocals: false` / `noUnusedParameters: false` — loosened during the rapid build-out.
- Comments explain *why*, not *what*.
