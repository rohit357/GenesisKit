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

## Naming seam (RESOLVED 2026-07-20)

Rebrand OpenUI → GenesisKit split fixed: all CSS classes + generated ids now use `gk-` prefix (was `oui-`), matching `gk-` tokens. Sweep covered src ts/tsx/css incl user's untracked theme.css (user approved). One prefix everywhere.

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

**DONE:** a11y audit (Dialog/RadioGroup/Select/Card/Tabs), prefix unification (`oui-`→`gk-`), package structure + exports (ESM/CJS + types, publint clean, react-dom peer, card types exported), tokens-in-bundle fix, Storybook foundation + theme switcher + Button reference story.

**Phase 1 (CURRENT):** Storybook coverage for all 13 remaining components (Input, Card, Checkbox, Textarea, Select, Badge, Alert, Spinner, Avatar, Switch, RadioGroup, Tabs, Dialog) at Button-story quality. Each: Playground / Variants / Sizes (if applicable) / States / Accessibility / Autodocs. NO redesign. Then GitHub Pages deploy.

**Phase 2:** Polish existing components (spacing, type, hover/active/focus, transitions, keyboard UX, responsive, a11y refinement, API + visual consistency). NO new components. Future stronger-model pass does deep premium visual design here — keep architecture flexible, don't block on it.

**Phase 3:** New components (Tooltip, Popover, DropdownMenu, Accordion, Progress, Skeleton, Toast, Breadcrumb, Pagination, Command palette, Drawer, Combobox, MultiSelect, Calendar, DatePicker, DataTable…) on shared internals + generator. Quality > quantity.

**Later:** Token v2 + density + createTheme; docs website; examples/next+vite; visual regression; Changesets + release → v1.0. Post-v1.0: CLI.

Standing rules: repo releasable after every milestone; tests pass; Storybook builds; a11y holds; backward compat where practical; stop for review after each milestone.

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

### 2026-07-20 — Milestone 2 step 5: Tabs (DONE, verified green) — MILESTONE 2 COMPLETE

- New `activationMode` prop (`automatic` | `manual`, default automatic). Manual: arrows/Home/End only move focus; Enter/Space (native button behavior) selects. Matches WAI-ARIA tabs pattern.
- New `keepMounted` prop (default false). True → all panels render, inactive get `hidden` attr → form state survives tab switches. False → only active panel in DOM (old behavior).
- Panel markup now maps over items (each panel own id/aria-labelledby pair); default still renders one panel only.
- +3 tests (manual focus-vs-select, keepMounted hidden panels, default unmount). 57 tests total.
- Full `npm run check` passes.
- NOT committed.
- **Milestone 2 done → next per plan: Milestone 3 consistency + release readiness (prefix unification first).**

### 2026-07-20 — Milestone 3 step 1: prefix unification (DONE, verified green)

- Mechanical sweep: `oui-` → `gk-` across all src ts/tsx/css. 473 refs in 38 files (components, tests, generated ids like `gk-select-*`/`gk-tab-*`, BEM classes, user's untracked theme.css — user approved including it).
- Zero `oui-` left in src. THEMING.md had none. ROADMAP/AGENT_NOTES keep historical mentions only.
- Breaking for anyone targeting `.oui-*` selectors — v0.1.0, no users, cheapest now.
- Full `npm run check` passes (57 tests, build green).
- NOT committed.
- Milestone 3 remaining: `"use client"` strategy, publint/attw/`npm pack` review, Changesets bootstrap. Then Storybook + docs (user-requested order).

### 2026-07-20 — Milestone 3 step 2: npm package structure + exports (DONE, verified green)

- **Bug fixed (publint caught):** `exports["."].types` resolved as ESM under `require` condition → CJS consumers got wrong types. Split into per-condition blocks: `import` → `.d.ts`/`.js`, `require` → `.d.cts`/`.cjs` (types key first in each). publint now "All good!".
- **Bug fixed:** `react-dom` used by Portal (createPortal) but missing from peerDependencies → added `"react-dom": ">=18"`.
- **Export hygiene:** new Card types `CardElement` + `CardHeadingLevel` were unexported → added to Card/index.ts + src/index.ts.
- Added scripts: `publint`, `attw` (`attw --pack .`), `prepublishOnly` (runs check + publint before any publish → main-releasable guard at publish time too).
- Added devDeps: `publint@^0.2.12`, `@arethetypeswrong/cli@0.16.4` (pinned).
- **attw crashes in THIS env** (`Cannot read properties of undefined (reading 'filename')`) on 0.16 + 0.17 — environmental (node PATH quirk on Git Bash Windows), NOT our package. Tarball hand-verified: dist has index.js/.cjs/.css + index.d.ts + index.d.cts + maps, README, LICENSE, package.json. attw runs fine in CI.
- Tarball contents correct (`npm pack` inspected). `files: ["dist"]` + README/LICENSE auto-included.
- Full `npm run check` passes (57 tests, build green).
- NOT committed.
- Milestone 3 remaining: `"use client"` directive strategy, Changesets bootstrap. Then Storybook + docs.

### 2026-07-20 — SHIP-BLOCKER fix: tokens missing from bundle (DONE, verified green)

- **Critical bug found while prepping Storybook:** `src/styles.css` imported component CSS only — NOT `tokens.css` (defines `--gk-color-*`, theme scopes) or `theme.css` (defines `--gk-button-bg` etc. component hooks). Chain: component CSS → `var(--gk-button-bg)` [theme.css] → `var(--gk-color-primary)` [tokens.css]. Shipped `dist/index.css` had ZERO token/hook vars → every consumer got unstyled components (all vars undefined).
- Why hidden: tokens.css + theme.css were untracked user files until user committed them this session; styles.css never wired them in.
- Fix: styles.css now imports in correct cascade order — (1) tokens.css, (2) component CSS, (3) theme.css hooks last (per its own "loaded after component styles" comment).
- Result: dist/index.css 20KB → 32KB, now contains `gk-theme-midnight`/`emerald`/`rose` scopes + 41 primary-color refs. Themes work by adding `class="gk-theme-*"` to any container.
- Full `npm run check` passes (57 tests, prettier clean incl now-tracked token/theme css, build green).
- NOT committed. **This unblocks Storybook — theme switcher will actually work now.**

### 2026-07-20 — Milestone 3/tooling: Storybook foundation (DONE, verified build)

- Storybook 8 + react-vite. Config: `.storybook/main.ts` (stories glob `src/**/*.stories.@(ts|tsx)`, addons essentials + a11y, telemetry off), `.storybook/preview.tsx`.
- **Theme switcher:** toolbar dropdown (globalTypes `theme`) → decorator wraps every story in `<div className={gk-theme-*}>` with canvas bg + text vars so dark themes legible. 4 themes: genesis/midnight/emerald/rose. Relies on the tokens-in-bundle fix from prior step.
- Pattern story: `Button.stories.tsx` — Playground (controls), Variants, Sizes, Loading, Disabled + autodocs tag. This is the TEMPLATE for remaining 13 stories.
- Scripts: `storybook` (dev :6006), `build-storybook`. devDeps: storybook, @storybook/react, react-vite, addon-essentials, addon-a11y (all ^8.4.7).
- Guards so `npm run check` stays green: stories live in src → typechecked/linted/formatted (all pass). vitest default include is `*.{test,spec}` → stories NOT collected as tests. tsup entry is only src/index.ts → stories NOT in published bundle. Added `storybook-static/` to .gitignore + .prettierignore + eslint ignores.
- `npm run build-storybook` exits 0 (Button story + a11y + docs compiled). Chunk-size warning cosmetic (SB internals).
- `npm run check` green (57 tests, build ok).
- NOT committed.
- **Next: remaining 13 stories (Input, Card, Checkbox, Textarea, Select, Badge, Alert, Spinner, Avatar, Switch, RadioGroup, Tabs, Dialog) using Button.stories pattern. Then Pages deploy workflow. Then docs.**
- npm audit now 8 vulns (6 moderate, 1 high, 1 critical) — Storybook dev-dep tree. Dev-only, not shipped. Address before v1.0.

### 2026-07-20 — Phase 1: Storybook coverage COMPLETE (all 14 components, verified build)

- Added 13 stories at Button-reference quality: Input, Card, Checkbox, Textarea, Select, Badge, Alert, Spinner, Avatar, Switch, RadioGroup, Tabs, Dialog. Each: Playground + Variants/Sizes/States as applicable + autodocs tag. a11y addon runs per story.
- Dialog story: controlled via local `useState` (open/onClose) so focus trap + scroll lock exercisable. Meta args include dummy `open:false`/`onClose` to satisfy required-prop story type; render overrides.
- Card/Dialog stories import Button as demo trigger — cross-component import fine in stories.
- **2 build gotchas fixed:** (1) Dialog StoryObj type required `open`/`onClose` → added to meta.args. (2) eslint `react-hooks/rules-of-hooks` errored on `useState` inside story `render` fns → added eslint override turning that rule off for `**/*.stories.{ts,tsx}` (SB render callbacks legitimately use hooks).
- `npm run check` green (57 tests, build ok). `npm run build-storybook` exit 0 — all 14 story files compiled.
- NOT committed.
- **Phase 1 remaining: GitHub Pages deploy workflow for Storybook. Then Phase 2 (polish).**

### 2026-07-21 — Phase 1 final: Storybook Pages deploy (DONE) — PHASE 1 COMPLETE

- `.github/workflows/deploy-storybook.yml`: push to main (+ manual dispatch) → npm ci → build-storybook → upload `storybook-static` → deploy via actions/deploy-pages@v4. Official Pages actions, `pages`/`id-token` permissions, `concurrency: pages` cancels stale deploys.
- **User must one-time enable: repo Settings → Pages → Source = "GitHub Actions".** Without it, deploy job fails.
- Site lands at https://rohit357.github.io/GenesisKit/ — Storybook = public demo (per plan, no separate demo app).
- prettier clean on workflow yml. No src changes → check unaffected (still green from prior step).
- NOT committed.
- **Phase 1 COMPLETE → Phase 2: polish existing components (no new components).**

### 2026-07-22 — Phase 2 kickoff: design-system audit + M1 token foundation (DONE, verified green)

- **Full library CSS audit** (all 14 components + tokens/theme/styles). Cohesion gaps found:
  1. No spacing scale — padding/gap ad hoc (`0.375/0.5/0.625/0.75/0.875/1/1.25/1.5/2rem`).
  2. No type scale — 8 scattered font-sizes, font-weight mixes 500/600/700/**800**, line-height mixes 1.25–1.5.
  3. Heading-weight drift: Alert title + Avatar use `800`; labels `600`; badge `700`. No rule → normalize to `bold`(700) later.
  4. **Dead color layer:** every component CSS hardcodes hex, then `theme.css` re-declares via tokens and WINS (loads last). e.g. Input border hardcoded `#94a3b8` but token `--gk-color-border`=`#cbd5e1` renders. Editing component-CSS colors does nothing → trap. Kill in per-family milestones.
  5. Raw motion: component CSS writes `150ms ease` literally, not `var(--gk-motion-fast) var(--gk-ease-standard)`. Animations ad hoc 160/180/200/220ms.
  6. Focus-ring opacity drift: 20/30/32/35% for the "same" ring.
- **M1 = token foundation (additive, zero visual/API change).** Added to `tokens.css` (`:root,.gk-theme-genesis` block, scale is theme-agnostic so not repeated per theme):
  - Spacing: `--gk-space-1..11` (2px step: 0.125→2rem) — matches existing rhythm so migration is 1:1, no redesign.
  - Type: `--gk-font-size-2xs..3xl` (0.6875→1.25rem), `--gk-font-weight-normal/medium/semibold/bold` (400/500/600/700), `--gk-leading-tight/snug/normal/relaxed` (1.25/1.35/1.45/1.5).
  - Motion: added `--gk-motion-emphasis: 220ms`, `--gk-ease-out`.
- `npm run check` green (57 tests, build ok). dist/index.css now carries the scale vars. NOT committed.
- **Phase 2 plan (milestones):** M2 form-field family (Input/Select/Textarea) → consume scales + kill dead color layer + border→token. M3 selection controls (Checkbox/Radio/Switch) → scales + focus-ring unify. M4 surfaces (Card/Dialog) → scales + heading-weight rule + motion tokens. M5 feedback/display (Alert/Badge/Avatar/Spinner/Tabs) → scales + drop 800 + motion tokens. M6 sweep + Storybook visual pass.
- **Next: M2 (form-field family). STOP for review first.**

### 2026-07-22 — Phase 2 M2: form-field family tokenized (DONE, verified green)

- Rewrote `Input.css`, `Select.css`, `Textarea.css` to consume the M1 scales + semantic color tokens. No markup/API/prop change.
- **Killed the dead-hex trap:** hardcoded hex in these 3 files was silently overridden by `theme.css` (loads last, wins). Replaced each with the token that ALREADY renders → CSS now honest + standalone-correct. Verified value-for-value so zero visual change, e.g.:
  - input border `#94a3b8` → `var(--gk-color-border)` (renders `#cbd5e1` today via theme — matched).
  - focus ring `rgb(37 99 235 / 20%)` → `var(--gk-focus-ring)` (renders 32% today — matched).
  - error border `#dc2626` → `var(--gk-color-danger)` (renders `#b91c1c` today — matched); error-focus ring `rgb(220 38 38/18%)` → `rgb(185 28 28/18%)` (matches theme's rendered value).
- Spacing → `--gk-space-*`; font-size → `--gk-font-size-*`; weight → `--gk-font-weight-*`; line-height → `--gk-leading-*`; transitions → `var(--gk-motion-fast) var(--gk-ease-standard)`.
- **One intentional micro-normalization:** description/error line-height `1.4` → `--gk-leading-normal` (1.45). Imperceptible on helper text; removes an off-scale value.
- Kept structural literals (max-width 28/32rem, min-height 2/2.5/3rem + textarea 4.5/5/6rem, select chevron right-padding 1.875/2/2.125rem — chevron clearance, not rhythm).
- `theme.css` untouched (still the customization-hook layer, still wins). Duplication component↔theme now both token-based → single source (token), no longer a trap.
- `npm run check` green (57 tests, build ok). dist/index.css 32.3→33.9KB (var refs). NOT committed.
- **Next: M3 selection controls (Checkbox/Radio/Switch) — scales + focus-ring unify. STOP for review first.**

### 2026-07-22 — Phase 2 M3: selection controls tokenized + focus-ring unified (DONE, verified green)

- Rewrote `Checkbox.css`, `RadioGroup.css`, `Switch.css` onto M1 scales + semantic tokens. No markup/API change.
- **Focus-ring unified:** all three used `outline: 3px solid rgb(37 99 235 / 35%)` → now `var(--gk-focus-ring)` (32%), matching Button + fields. Closes the 20/30/32/35% drift for the whole interactive set. Imperceptible 35→32% shift.
- **Legend weight normalized:** radio `__legend` `700` → `--gk-font-weight-semibold` (600) to match the form-family label tier (Input/Select/Textarea labels = 600). Hierarchy still clear: group label 600 > option label 500 (medium) > helper 400/normal.
- Switch motion tokenized: `150ms ease` → `var(--gk-motion-fast) var(--gk-ease-standard)` (curve now matches fields; was raw `ease`). Track radius `999px` → `--gk-radius-full`.
- Hardcoded hex → matching tokens (accent `#2563eb`→primary, checked track→primary, thumb `#fff`→surface, label/desc/error colors→tokens) — all value-matched to what theme.css renders today, zero visual change.
- Helper line-height `1.4` → `--gk-leading-normal` (1.45), same micro-normalization as M2.
- **Kept literal (off-scale one-offs, documented):** switch off-track grey `#94a3b8` (no semantic token exists), thumb shadow `0 1px 2px rgb(15 23 42/25%)` (25% ≠ shadow-sm 8%), control box dims (1rem/0.875rem, track/thumb sizes), optical radio margin `0.2rem`, text indents (checkbox `1.625rem`, switch `3.375rem` = control width + gap).
- `npm run check` green (57 tests, all gates). NOT committed.
- **Next: M4 surfaces (Card/Dialog) — scales + heading-weight rule + motion tokens. STOP for review first.**

### 2026-09-15 — Phase 2 M4: surfaces refined + Card variant expansion (DONE, verified green)

- **Card:** migrated hardcoded literals → tokens (spacing/type/radius/shadow/motion). Title now `--gk-font-weight-bold` (700) — heading-weight rule applied. Description `--gk-font-weight-normal` (400), muted color via existing semantic var. Padding scale (`sm/md/lg`) maps to `--gk-space-8/10/11`. Header gap, header→content margin, footer margin/padding all on the scale.
- **Card variants:** kept `elevated` + `outlined`, added `soft` (surface-subtle bg + subtle border + no shadow) for low-emphasis surfaces. Theme hooks exposed per variant.
- **Card `interactive` prop:** NEW, visual only — hover lift + cursor pointer + focus ring. Does NOT change semantics (no auto `role=button`, card stays role-less div). Consumers compose their own `<button>`/`<Link>` wrapper when they need actionable semantics. Test guards the no-role contract.
- **Dialog:** migrated hardcoded literals → tokens. Title font-weight-bold applied. Motion (`160ms ease-out` / `180ms ease-out`) → `--gk-motion-fast` / `--gk-motion-enter` + `--gk-ease-standard`/`--gk-ease-out`. Focus ring → `--gk-focus-ring`. Close button → placeholder/heading colors.
- **Dialog `size` prop:** NEW `sm|md|lg` (24rem / 32rem / 42rem). Default `md` preserves old max-width (32rem) → fully backward compatible. New size vars in tokens.css (`--gk-dialog-size-sm/md/lg`) + matching theme hooks. Test asserts default md + class flips on sm/lg.
- **Public API preserved:** Card variant type widened (`outlined | soft`), `interactive` added (default false), Dialog `size` added (default md). No removal. Existing stories still work.
- +3 tests (Card soft, Card interactive no-role contract, Dialog size class). 60 tests total.
- Storybook: Card stories gained `Padding` + `Interactive`; Dialog stories gained `Sizes`. Existing stories intact.
- `npm run check` green (60 tests, all gates). `npm run build-storybook` exit 0.
- NOT committed.
- **Next per approved plan: M4.5 (Spinner + Tabs token polish). STOP for review first.**

### 2026-09-15 — Phase 2 M4.5: Spinner + Tabs token polish (DONE, verified green)

- **Tabs:** migrated hardcoded literals → tokens.
  - Colors: `#172033`→`--gk-color-text`, `#e2e8f0`→`--gk-color-border-subtle`, `#64748b`→`--gk-color-placeholder`, `#f8fafc`→`--gk-color-surface-subtle`, `#1d4ed8`→`--gk-color-primary-hover`, `#2563eb`→`--gk-color-primary`.
  - Spacing: `1rem`→`--gk-space-8`, `0.25rem`→`--gk-space-2`, `0.5rem`→`--gk-space-4`, `0.625rem 0.875rem`→`--gk-space-5`/`--gk-space-7`.
  - Typography: `font-size: 0.9375rem`→`--gk-font-size-lg`, `font-weight: 600`→`--gk-font-weight-semibold`, panel `line-height: 1.5`→`--gk-leading-relaxed`.
  - Motion: `transition: 150ms ease`→`var(--gk-motion-fast) var(--gk-ease-standard)`; panel enter `180ms ease-out`→`var(--gk-motion-enter) var(--gk-ease-out)`.
  - Focus: `outline: 3px solid rgb(37 99 235 / 30%)`→`var(--gk-focus-ring)` (32%, matches Button + fields + controls — final focus-ring drift closed).
  - `prefers-reduced-motion` honored (transition-duration 0.001ms + animation none).
- **Spinner:** reviewed — already token-clean (`currentColor` → `--gk-spinner-color` hook in theme.css wins). Sizes (0.875/1.25/2rem) + border-width (2/3px) + 700ms rotation are deliberate off-scale component literals (control dimensions, not UI motion). No token candidate exists. No edits required beyond reformatting the file to match prettier.
- **No API change.** No story change required. No new variants.
- `npm run check` green (60 tests, all gates). `npm run build-storybook` exit 0. dist/index.css 37.90→38.31 KB (Tabs var refs).
- NOT committed.
- **Next per approved plan: M5 feedback/display (Alert/Badge/Avatar/Spinner/Tabs). STOP for review first.**

### 2026-09-15 — Phase 2 M5: feedback/display family expressive + token-clean (DONE, verified green)

**Alert** [Alert.tsx](src/components/Alert/Alert.tsx):
- **NEW `icon?: ReactNode` slot** — leading ReactNode (svg/emoji). Wrapped in `aria-hidden` div so it does not duplicate status announcement. Real-world use: `<Alert icon={<CheckIcon />} status="success">`. Avoided auto-default-icon-per-status mapping (brittle; consumers pick their own product icon).
- **NEW `actions?: ReactNode` slot** — trailing ReactNode between content and dismiss. Real-world: "Undo", "View details", "Update now". Common pattern in product alerts.
- Title font-weight 800→`--gk-font-weight-bold` (700). Title `--gk-font-size-md`; message `--gk-font-size-sm`. Hierarchy preserved via size + weight.
- Animation 220ms ease-out→`--gk-motion-emphasis` + `--gk-ease-out`. Focus ring → `--gk-focus-ring`. Line-height 1.45→`--gk-leading-normal`. Spacing scale throughout. Status colors → existing semantic tokens (`--gk-color-{primary,success,warning,danger}-{soft,border}`).
- Dismiss button hover opacity + `--gk-focus-ring` focus treatment.

**Badge** [Badge.tsx](src/components/Badge/Badge.tsx):
- **NEW `outline?: boolean`** — transparent bg, semantic border + text. Justified: badges used inline with text (table cells, status pills) where filled too heavy.
- **NEW `dot?: boolean`** — leading status dot using `currentColor`. Common presence-indicator pattern.
- **NEW `removable?: boolean` + `onRemove` + `removeLabel`** — close affordance with accessible label. Filter-chip pattern, common in real product UI.
- Token migration: font-weight 700→`--gk-font-weight-bold`; sizes `0.6875rem`/`0.75rem`→`--gk-font-size-2xs`/`--gk-font-size-xs`; paddings/min-heights → `--gk-space-*`; radius 999px→`--gk-radius-full`. New theme hooks: `--gk-badge-outline-bg`.
- Removed per-variant enter animation (was every badge on every render — visual noise). Kept remove-button hover transition only.

**Avatar** [Avatar.tsx](src/components/Avatar/Avatar.tsx):
- **NEW `status?: AvatarStatus`** — `"none" | "online" | "busy" | "away" | "offline"`. Bottom-right dot. `none` (default) hides dot entirely. New theme hooks `--gk-avatar-status-{online,busy,away,offline}`. Decorative (`aria-hidden`) — presence semantics live on context, not avatar.
- **NEW `size="xl"`** (5rem) — hero/profile avatar size for user menus, settings headers. Off-scale component literal like other avatar dims.
- Token migration: font-weight 800→`--gk-font-weight-bold`; sizes → `--gk-font-size-{xs,lg,2xl,3xl}`; bg gradient via `--gk-avatar-bg` hook (theme.css wins; gradient identical to what previously rendered).
- AvatarGroup **deferred** (not in M5 scope — would be a new component family).

**Spinner** [Spinner.css](src/components/Spinner/Spinner.css):
- Reviewed. No edits needed. Already token-clean. 700ms rotation is intentional off-scale component dim. Sizes 0.875/1.25/2rem + border-width 2/3px kept as off-scale component literals (no semantic token exists; rotation ≠ UI motion scale).

**Tabs** [Tabs.tsx](src/components/Tabs/Tabs.tsx):
- **NEW `variant?: "underline" | "pills"`** — pills renders soft-pill tabs with active filled with primary bg + primary-foreground text. Justified: pill-style tabs are a legitimate alternative visual language for in-page filtering / tool switchers. Keyboard nav + activationMode + keepMounted + orientation behavior unchanged across both variants (test guards it).
- New theme hooks: `--gk-tabs-pill-active-bg`, `--gk-tabs-pill-active-text`.

**Public API additions (all backward compatible, defaults preserve prior behavior):**
- `Alert.icon?`, `Alert.actions?`
- `Badge.outline?`, `Badge.dot?`, `Badge.removable?`, `Badge.onRemove?`, `Badge.removeLabel?`
- `Avatar.status?`, `AvatarSize` widened from `"sm"|"md"|"lg"` to `"sm"|"md"|"lg"|"xl"`
- `Tabs.variant?` defaulting to `"underline"`

**Visual-system decisions:**
- All five components share: `--gk-font-size-*` + `--gk-font-weight-*` + `--gk-leading-*` scale; `--gk-space-*` padding/gap; `--gk-focus-ring` (32% across the board — focus-ring drift closed M4.5); `--gk-motion-fast` + `--gk-ease-standard` (hover/active), `--gk-motion-{enter,emphasis}` + `--gk-ease-{standard,out}` for entrance animations; `--gk-radius-{sm,md,full}` for shape consistency; semantic color tokens per status.
- Heading-weight drift fully resolved: Alert title + Avatar use `--gk-font-weight-bold` (700) — no more `800`.

**Accessibility preserved:**
- Alert `role`/`aria-live` per status unchanged. New icon wrapper `aria-hidden` so screen readers still hear title + body.
- Badge remove button has accessible label via `removeLabel`; dot is `aria-hidden`.
- Avatar status dot is `aria-hidden` — does not pollute the avatar's accessible name. `role="img"` + `aria-label={alt ?? name}` unchanged.
- Tabs pills variant keeps ARIA roles, roving tabindex, manual/automatic activation, keepMounted, vertical orientation. Test explicitly asserts keyboard nav works in pills.
- `prefers-reduced-motion` honored everywhere (Alert + Badge remove + Tabs panel enter all disable animation).

**Tests:** +11 new (Alert icon slot + actions slot + actions-before-dismiss ordering; Badge outline + dot a11y + removable; Avatar xl size + status dot rendering + status-none hides dot; Tabs pills class + keyboard nav). **71/71 green.**

**Storybook:** added stories only where they demonstrate new capability.
- Alert: `WithIcon`, `WithActions`, `WithIconAndActionsAndDismiss`. Existing stories intact.
- Badge: `Outline`, `Dot`, `Removable`. Existing Variants/Sizes intact.
- Avatar: `Sizes` extended (sm/md/lg/xl), `Statuses`. Existing intact.
- Tabs: `Pills`. Existing intact.
- Spinner: unchanged.

**Verified:**
- `npm run check` exit 0. typecheck + lint + format + 71 tests + build all green.
- `npm run build-storybook` exit 0.
- dist/index.css 38.31 → 41.73 KB (new component selectors + theme hooks).
- dist/index.js 27.76 → 29.68 KB (slot wiring + new props).
- All existing tests still pass — zero regressions.
- NOT committed.
- **Next per approved plan: M5.5 Button richness. STOP for review first.**

### 2026-09-15 — Phase 2 M5.5: Button richness + flagship standard established (DONE, verified green)

**Button expanded** [Button.tsx](src/components/Button/Button.tsx) — flagship Button:

**API additions (all backward compat, defaults preserve prior behavior):**
- `variant` widened: `"primary" | "secondary" | "ghost" | "danger" | "outline" | "soft" | "link" | "gradient"`.
- NEW `fullWidth?: boolean` (default false). Stretches to fill parent width. Mobile CTAs / form submits.

**API proposals REJECTED (with reasoning):**
- `iconLeft` / `iconRight` slot props — **rejected**. React children composition already provides a cleaner API: `<Button><Icon /> Create project</Button>`. Slot props add API surface for a layout concern solvable by composition. Documented in README with two patterns (with-label, icon-only with `aria-label`).
- `iconOnly` prop — **rejected**. Same reasoning: consumers set `aria-label` on the button directly and compose children. A prop would create a "magic aspect ratio" rule with no real win.
- New `size="xs"` — **rejected**. No real demand; sm already covers tight rows. Adding it just for symmetry is exactly the prop-explosion trap the standard forbids.

**Visual design:**
- All variants share typography, focus-ring, motion, and hover-lift (-1px) + shadow-sm treatment from M4 polish. **No** gimmicks.
- `outline` — bordered transparent, primary fg + primary-border, primary-soft on hover. Visual weight just below secondary.
- `soft` — primary-soft bg, primary fg, **flat** (no hover-lift/shadow — feels quieter). Hover darkens to primary-border.
- `link` — text-only, no chrome, no min-width, padding 0. Hover underlines + uses primary-hover.
- `gradient` — linear-gradient(135deg, primary → primary-hover). Hover reverses gradient + shadow-md. Hero/marketing CTA feel without being shouty.
- All variants respect theme hooks `--gk-button-{outline,soft,link,gradient}-{bg,fg,border,hover-bg}` so consumers can re-tone without forking.

**Theme.css hooks added:** `--gk-button-outline-*`, `--gk-button-soft-*`, `--gk-button-link-*`, `--gk-button-gradient-*`. Preserves primitive→semantic→component→consumer override stack. No runtime CSS-in-JS.

**Tests:** +7 (4 variant-class tests via `it.each`, fullWidth class, icon-composition accessible name + icon child, loading with new variants). **78/78 green.**

**Storybook:** added `IconComposition` (4 buttons composing icons via children — demonstrates the no-slot-prop API), `FullWidth` (3 stacked), `LoadingWithVariant`, `Hierarchy` (semantic importance ordering: primary → secondary → outline → soft → ghost → link). Existing stories intact.

---

## FLAGSHIP COMPONENT STANDARD (reusable for every component in the library)

**Established M5.5.** Every component in GenesisKit must eventually meet this standard. "Flagship" = best-in-class within its category, not "maximum props".

Every component is evaluated against:

1. **Default design** — default state already looks premium, not generic.
2. **Visual variety** — meaningful visual modes, not random variants.
3. **Customization** — colors, radius, spacing, depth tunable via tokens + CSS-var hooks.
4. **Composition** — combines naturally with other GenesisKit components (Alert + Button, Card + Button, Dialog + Button).
5. **States** — hover, active, focus, disabled, loading, error, selected all polished.
6. **Accessibility** — semantics, keyboard, ARIA, focus, `prefers-reduced-motion` preserved.
7. **Responsiveness** — behaves well across widths/densities.
8. **Theme personality** — responds correctly to GenesisKit themes (midnight/emerald/rose) and eventually personality presets.
9. **Storybook** — shows both technical behavior AND meaningful visual possibilities.
10. **API quality** — props justified, composable, typed, understandable. Composition > prop slots. Documented rejection reasons for any API considered.

**Per-component expression vocabulary (do NOT force symmetry):**
- **Button:** variants + size + loading + fullWidth + icon composition
- **Card:** surface/elevation + density + interactive treatment + header/footer composition
- **Dialog:** sizes + surface treatment + layout + actions + motion
- **Alert:** status + icon + actions + dismissible + visual treatment
- **Badge:** status + dot + outline + removable + compact density
- **Avatar:** sizes + status + shape + image/fallback
- **Tabs:** underline/pills + density + icon/badge composition + active state
- **Input/Select/Textarea:** density + labels/descriptions/errors + adornments + focus/error/disabled
- **Checkbox/Radio/Switch:** control sizing + state visuals + label hierarchy + descriptions + focus
- **Spinner:** size + label + contextual color + reduced-motion

**Visual bar:** "Would a developer be happy to use this in a polished production app without immediately restyling it?" If no, the component is not finished.

**Architecture preservation:** primitive tokens → semantic/theme tokens → component hooks → variants/states → consumer overrides. No runtime CSS-in-JS. No hundreds of one-off variables.

---

- `npm run check` exit 0. typecheck + lint + format + 78 tests + build all green.
- `npm run build-storybook` exit 0.
- dist/index.css 41.73 → 43.20 KB. dist/index.js 29.68 → 31.42 KB.
- All existing tests still pass — zero regressions.
- NOT committed.
- **Next per approved plan: M6 customization system first-class. STOP for review first.**

