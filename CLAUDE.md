# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Read these first

- `ARCHITECTURE.md` — how the code is organized today: module map, coordinate system, config/effective split, thrust pipeline, save data shapes, gotchas, tried-rejected list. Source of truth for "how this code works."
- `HANDOFF.md` — where you left off last session (written by `/handoff`).
- `NOTES.md` — your notes to self (appended by `/note`).
- `BRIEF.md` — original design brief and the iterated constants that produce the good feel.
- `prototype.html` — the canonical "what good feels like" snapshot, preserved at the repo root. Open it next to the dev build whenever you suspect feel drift. Do **not** delete it.

If ARCHITECTURE.md and the code disagree, the code wins — and update ARCHITECTURE.md.

## Commands

```bash
npm install --cache=/tmp/npm-cache-pw   # workaround for an EACCES on ~/.npm
npm run dev                              # vite dev server
npm run build                            # tsc -b && vite build
npm run deploy                           # builds and force-pushes dist/ to gh-pages branch
```

There is no test runner, linter, or formatter configured. `tsc -b` (run as part of `build`) is the only correctness check.

## DO NOT BREAK (full list in ARCHITECTURE.md)

- **All physics is dt-based in px/sec.** Never per-frame deltas (Safari can ramp to 120Hz mid-session).
- **Stream is always moving.** Don't lower `velWindowMs` below ~150.
- **Tile pop is instant.** No hitstop, no anticipation, no squash.
- **Splash blending is normal, NOT additive.** Alpha is stiff (hold 0.7 then snap to 0).

## Style notes

- Vanilla TS, no framework. Functions over classes.
- Dependencies are deliberately minimal: `vite`, `typescript`, `lil-gui`, `gh-pages`. Don't add more without a strong reason.
- `tsconfig.json` has `noUnusedLocals: false` / `noUnusedParameters: false` — loosened during the rapid build-out.
- Comments explain *why*, not *what*.
