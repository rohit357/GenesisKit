# Agent Notes — GenesisKit

Working notes for AI agents + humans. Project state, context, decisions.
Read at session start. Update after every step.

## What is this

`genesiskit` — React + TypeScript UI component library. v0.1.0, MIT.
Build: tsup (ESM + CJS + d.ts). Test: vitest + testing-library.
Repo: https://github.com/rohit357/GenesisKit

## Working convention

- **Review cadence:** after every dev step, STOP + wait for user review. No batching.
- **Component folder pattern (keep this, scale it):** each component = isolated folder with `X.tsx` + `X.types.ts` + `X.css` + `X.test.tsx` + `index.ts` + `README.md`.
- Full plan: see `ROADMAP.md`.

## Naming seam (known debt)

Rebrand OpenUI → GenesisKit left split:
- CSS classes still use `oui-` prefix.
- Design tokens use `gk-` prefix.
- Unify to single prefix planned (Milestone 1 leftover / Milestone 2).

## Verification commands

```
npm run typecheck   # tsc --noEmit
npm run lint        # eslint .
npm run format:check
npm run test        # vitest run (46 tests)
npm run build       # tsup
npm run check       # all of the above
```

## Progress log

### 2026-07-20 — Milestone 1: Foundation sweep (DONE, verified green)

- `ROADMAP.md` written (audit + phased plan).
- Extracted shared `cx()` → `src/utils/cx.ts`. All 14 components import it. Removed 14 copy-pasted defs.
- `package.json`: added repository/homepage/bugs/author/keywords + lint/format scripts. **Repo link corrected by user to `rohit357/GenesisKit`.**
- ESLint flat config (`eslint.config.js`): typescript-eslint + react-hooks + jsx-a11y. Installed deps.
- Prettier (`.prettierrc.json`, `.prettierignore`). Formatted all 78 files to one style.
- GitHub Actions CI (`.github/workflows/ci.yml`): typecheck + lint + format-check + test + build on push/PR to main.
- **Bug fixed:** removed invalid `aria-invalid` on `role="radio"` input in RadioGroup (ESLint jsx-a11y caught it).
- Full `npm run check` passes: 46 tests green, build success.
- NOT committed yet.

**Open flags:**
- 5 pre-existing npm audit vulns (3 moderate, 1 high, 1 critical). Did NOT run `audit fix --force` (breaking risk). Revisit.
- No browser/visual verification yet — no dev/demo app. Storybook is roadmap item.

## Components (14)

Button, Input, Card, Checkbox, Textarea, Select, Badge, Alert, Spinner,
Avatar, Switch, RadioGroup, Tabs, Dialog.

## Next milestones (from ROADMAP)

2. A11y audit fixes: Dialog (portal/focus-trap/scroll-lock), Select (placeholder/chevron), Card (heading level), Tabs (manual activation + keepMounted), RadioGroup (fallback name + required).
3. Token v2 + real dark mode + new schemes (soft/sharp/glass) + `createTheme`.
4. Shared internals (Portal, useFocusTrap, useControllableState) → new components (forms, overlays).
5. Storybook + docs + visual tests.
6. Phase C/D components + release pipeline + v1.0.
