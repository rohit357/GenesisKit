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
- **`main` must always remain releasable.** Never commit or push if any of these fail: tests, build, lint, format, GitHub Actions / CI. `npm run check` covers all local gates — run it before every commit.
- **Git workflow (user runs git themselves; agent supplies commands):**

  ```bash
  git status
  git add .
  git diff --cached   # ALWAYS review staged diff before committing
  git commit -m "<meaningful conventional commit>"
  git push origin main
  ```

  Caution: `git add .` stages everything — repo has untracked user files (THEMING.md, src/theme.css, src/tokens.css) that must NOT be committed until user says so. Prefer explicit `git add <paths>`; if using `git add .`, the `git diff --cached` review is mandatory.
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
npm run test        # vitest run
npm run build       # tsup
npm run check       # ALL of the above (incl format:check) — MUST match CI. Run before every commit.
```

**CI parity rule:** `npm run check` now includes `format:check`, so local green == CI green. Always run `npm run check` (not partial checks) before saying done. CI #2 went red because format:check was skipped locally — fixed by adding it to the check chain.

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

## Next milestones (from ROADMAP — renumbered 2026-07-20 after plan merge)

2. A11y audit fixes: ~~Dialog (portal/focus-trap/scroll-lock)~~ DONE. ~~RadioGroup (fallback name + required)~~ DONE. ~~Select (placeholder/chevron)~~ DONE. ~~Card (heading level + labelled section)~~ DONE. Remaining: Tabs (manual activation + keepMounted).
3. Consistency + release readiness: unify `oui-`/`gk-` prefix (mechanical sweep, BEFORE new components), `"use client"` strategy, publint/attw/`npm pack` review, Changesets bootstrap.
4. Token v2 + real dark mode + new schemes (soft/sharp/glass) + `createTheme` + density modes.
5. Shared internals (~~Portal, useFocusTrap~~ DONE; useControllableState, useDismiss, positioning next) + `new:component` generator → Phase A/B components.
6. Storybook (doubles as public demo site) + docs + a11y CI + visual regression + `examples/next` + `examples/vite`.
7. Phase C/D components + release pipeline hardening + README/marketing/launch → v1.0.

## Progress log (cont.)

### 2026-07-20 — Milestone 2 step 1: Dialog rebuild (DONE, verified green)

- New shared internals: `src/utils/Portal.tsx` (SSR-safe createPortal wrapper), `src/utils/useFocusTrap.ts` (Tab trap + body scroll-lock + return-focus). Exported from `src/utils/index.ts`.
- `Dialog.tsx`: renders via Portal, uses useFocusTrap. Props + BEM classes unchanged → CSS + old tests intact. Kept Escape-to-close + close button + not-rendered-when-closed.
- Added 2 tests: scroll-lock toggle, focus-into-dialog + return-to-trigger. 48 tests total.
- **Portal design note:** renders immediately when `document` exists (no mount-gate), else null. Consumers gate on client `open` flag → mounts post-hydration. Earlier mount-gate caused ref-null-on-first-effect bug (trap never armed). Do NOT re-add useEffect mount gate.
- NOT committed.

### 2026-07-20 — CI gap fix + Milestone 2 step 2: RadioGroup (DONE, verified green)

- **CI #2 red cause:** `format:check` skipped locally, CI runs it. Fix: added `npm run format:check` to `check` script chain. Now local `npm run check` == CI exact.
- RadioGroup: `name` now optional → auto-gen `oui-radio-${useId}` fallback (radios never join page-global group). Added `required` prop → sets `required` on all radios + shows `*` indicator on legend (`.oui-radio-group__required`, danger color).
- +2 tests (name auto-gen, required). 50 tests total.
- Full `npm run check` passes (incl format + build).
- NOT committed.

### 2026-07-20 — Plan merge (docs only, no code)

- User supplied external suggestion list; merged into ROADMAP.md + this file. No overwrite — additions only.
- Already-covered suggestions (no change needed): Storybook w/ theme switching, docs site, CI, README badges/gallery, component generator, Changesets, phased components, a11y priority.
- New in plan: Storybook doubles as public demo site (no separate demo app); a11y CI (vitest-axe / Storybook+axe) + bundle-size + export-hygiene as later CI additions; visual regression (Chromatic or Playwright screenshots) after Storybook; publint + @arethetypeswrong/cli + `npm pack --dry-run` for package readiness; `examples/next` + `examples/vite` apps; versioning discipline + explicit v1.0 criteria; density modes; extensibility note (hooks/utils/layout/blocks keep folder pattern).
- **Order change (only one):** new milestone 3 "Consistency + release readiness" — prefix unification + `"use client"` + package checks + Changesets bootstrap — pulled AHEAD of token v2. Reason: prefix sweep is mechanical, cost grows with every new component/theme; token v2 touches all CSS anyway, cheaper after names settle. Everything else keeps original order (correctness/a11y still first).
- Marketing/launch stays LAST (milestone 7) — nothing to market before docs + stable API.

### 2026-07-20 — Plan merge round 2 (docs only, no code)

- Added to ROADMAP: **Publish checklist** (8 steps: check → pack → publint → attw → verify exports/types → test tarball in examples/next + examples/vite → GitHub Release → publish) under §4.
- Added: dedicated docs website (e.g. `docs.genesiskit.dev`) as long-term item — Storybook stays playground; docs site owns install/guides/theming/API ref/migrations/CLI docs.
- Added: **Post-v1.0** section — `npx genesiskit add button` CLI (shadcn-style copy-in). Gated on stable APIs + unified prefix + docs site. NOT before v1.0.
- Added to this file: repo rule "`main` always releasable" + git workflow with mandatory `git diff --cached` review (and `git add .` caution re: untracked user theme files).
- No milestone order change this round.

### 2026-07-20 — Milestone 2 step 3: Select (DONE, verified green)

- Placeholder option now `hidden` (was only `disabled`) → shows as initial display text, never re-selectable from dropdown, no ghost option in list.
- Uncontrolled + placeholder + no defaultValue → component supplies `defaultValue=""` so placeholder is what renders first. Explicit `defaultValue`/`value` still win.
- Custom chevron: `appearance: none` + inline-SVG `background-image` (slate #475569, right-aligned), extra right padding per size (sm/md/lg) so text never overlaps arrow. Cross-browser consistent (was native OS arrow).
- Updated `placeholder` JSDoc. +2 tests (placeholder default-selected + unselectable; explicit defaultValue wins). 52 tests total.
- Full `npm run check` passes.
- NOT committed.

### 2026-07-20 — Milestone 2 step 4: Card (DONE, verified green)

- New `headingLevel` prop (2–6, default 2) → title renders as matching `h*`, cards fit page outline (nested cards no longer force h2).
- New `as` prop (`div` | `section` | `article`, default `div`).
- **aria-labelledby fix:** was always set on role-less div (no effect for AT, misleading). Now only wired when `as="section"`/`"article"` (elements with a role that accepts a name). Default div gets none.
- Updated 1 test (div no longer has aria-labelledby), +2 tests (section region named by title; headingLevel renders h3). 54 tests total.
- Full `npm run check` passes.
- NOT committed.

