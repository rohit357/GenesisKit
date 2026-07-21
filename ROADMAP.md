# GenesisKit Roadmap

The plan to grow GenesisKit into a best-in-class, beautiful, and flexible
UI + boilerplate component library.

## Where we are today

14 components, each in an isolated folder (`.tsx` + `.types.ts` + `.css` +
`.test.tsx` + `index.ts` + `README.md`): Button, Input, Card, Checkbox,
Textarea, Select, Badge, Alert, Spinner, Avatar, Switch, RadioGroup, Tabs,
Dialog.

Strong foundations already in place:

- TypeScript strict mode, `forwardRef` throughout.
- Real ARIA wiring (labels, `aria-describedby`, `role="alert"`, roving
  tabindex in Tabs).
- `prefers-reduced-motion` handled across components.
- CSS-variable theming with 4 schemes (`genesis`, `midnight`, `emerald`,
  `rose`).
- tsup build (ESM + CJS + d.ts), vitest + testing-library tests.

Known gaps: no CI, no Storybook/docs, no lint/format, no release automation,
no `.github` community files, incomplete dark mode, and a naming seam left by
the rebrand (`oui-` CSS classes vs `gk-` tokens).

## 1. Redesign audit — fix before scaling

### High priority (correctness / a11y)

- **Dialog** — add focus trap, body scroll-lock, portal rendering, and
  return focus to the trigger on close.
- **RadioGroup** — generate a fallback `name` (radios currently join the
  page-global group if `name` is omitted); add `required` support.
- **Select** — fix placeholder option (`hidden` + selected default); add a
  custom chevron for consistent cross-browser styling.
- **Card** — make heading level configurable; fix `aria-labelledby` on a
  role-less element.
- **Tabs** — add manual-activation mode and `keepMounted` for forms.
- **All interactive components** — add a `"use client"` strategy for Next.js
  App Router / RSC.

### Medium (consistency)

- Extract the copy-pasted `cx()` helper into `src/utils/cx.ts`.
- Unify the `oui-` / `gk-` naming into a single prefix (do it now, at v0.1.0,
  before there are users).
- Enforce consistent formatting/lint (Prettier + ESLint).

## 2. Beautiful, attractive, flexible design schemes

- **Token architecture v2** — add the primitive layer (color scales, spacing,
  typography, radius) beneath the existing semantic + component-hook layers.
- **Real dark mode** — complete `midnight` (success/warning/danger tokens are
  still light-only) + `prefers-color-scheme` auto mode.
- **Full personality presets** (single class, all components inherit):
  `genesis`, `midnight`, `soft` (pastel, large radii), `sharp` (brutalist),
  `glass` (translucent + blur), `terminal` (mono + neon).
- **`createTheme({ primary, radius })`** helper to generate schemes without
  writing CSS.
- **Density modes** (`comfortable` / `compact`).
- **Per-component polish** — Button `soft`/`outline`/`link`/`gradient`
  variants + icon slots + `fullWidth`; Alert status icons; Avatar status dot +
  group/"+N"; Badge dot/removable/outline.

## 3. New components (phased)

- **A — Forms:** FormField primitive, Slider, NumberInput, PinInput/OTP,
  FileUpload, SearchInput, PasswordInput.
- **B — Overlays/feedback:** Tooltip, Popover, DropdownMenu, Toast
  (`useToast`), Drawer, Progress, Skeleton — after shared internals:
  `Portal`, `useFocusTrap`, `useControllableState`, `useDismiss`, positioning.
- **C — Nav/data:** Accordion, Breadcrumb, Pagination, Table, Stepper,
  EmptyState, Timeline, Command palette (⌘K).
- **D — Layout + boilerplate blocks:** Stack/Grid/Container/Divider, plus
  themeable sections (AuthForm, PricingTable, Navbar/Sidebar shells,
  HeroSection).

## 4. Tooling, docs & GitHub presence

- Storybook (every component × every theme, with a theme-switcher toolbar) →
  GitHub Pages. This doubles as the public demo site — one deploy, no separate
  demo app to maintain.
- Docs site with live theme switcher and generated props tables. Long-term:
  a dedicated documentation website (e.g. `docs.genesiskit.dev`) separate
  from Storybook — Storybook stays the live component playground; the docs
  site owns installation, guides, theming, API reference, migration guides,
  and CLI documentation.
- GitHub Actions CI: typecheck + lint + format-check + test + build
  _(live — `.github/workflows/ci.yml`)_; later add a11y (vitest-axe or
  Storybook test-runner + axe), bundle-size, and export-hygiene checks.
- Visual regression testing once Storybook exists (Chromatic free tier, or
  Playwright screenshot tests in CI as the zero-cost fallback).
- Changesets release automation + versioning discipline: semver from v0.x,
  every user-facing change gets a changeset, `CHANGELOG.md` generated,
  npm publish via CI on tagged release. v1.0 criteria: prefix unified, a11y
  audit list closed, token v2 shipped, docs live, zero known API breaks
  pending.
- npm package readiness: `publint` + `@arethetypeswrong/cli` + `npm pack
  --dry-run` review; verify `exports` map, `files` whitelist, `sideEffects`
  flag for CSS, README/LICENSE included.

### Publish checklist (run before every npm release)

1. `npm run check` — full local gate (typecheck, lint, format, test, build).
2. `npm pack` — inspect the tarball contents.
3. `publint` — package.json / exports correctness.
4. `attw` (`@arethetypeswrong/cli`) — type-resolution across module systems.
5. Verify exports & types manually (`exports` map, `d.ts` entry points).
6. Test the packed tarball locally in Next.js (`examples/next`) and Vite
   (`examples/vite`).
7. Create a GitHub Release (tag + changelog notes).
8. `npm publish`.
- ESLint + Prettier _(live)_ + Stylelint.
- `.github` templates + a `npm run new:component` generator that scaffolds
  the standard folder (`X.tsx` + `X.types.ts` + `X.css` + `X.test.tsx` +
  `index.ts` + `README.md`) and registers exports.
- Example apps in `examples/` — `examples/next` (App Router, exercises
  `"use client"` strategy) and `examples/vite` (plain React). Smoke-test
  real-world usage of the built package.
- README glow-up: hero, badges (CI, npm version, license, bundle size),
  screenshots/GIFs of components per theme, theme gallery, StackBlitz
  playground.

## 5. Execution order

**Status (2026-07-20):** Milestones 1–3 substantially done — a11y audit closed
(Dialog/RadioGroup/Select/Card/Tabs), component architecture stable, CI green,
57 tests passing, package exports finalized (ESM/CJS + types, publint clean,
package validated), theme system complete with tokens correctly bundled,
Storybook foundation up with a working theme switcher, and `Button.stories`
established as the reference-quality standard.

### Phase 1 — Storybook coverage (CURRENT)

Story for every existing component, matching `Button.stories` quality. Remaining:
Input, Card, Checkbox, Textarea, Select, Badge, Alert, Spinner, Avatar, Switch,
RadioGroup, Tabs, Dialog. Each includes only what applies: Playground, Variants,
Sizes, States (loading/disabled/error), Accessibility, Autodocs. **No redesign
in this phase** — goal is complete docs + coverage. Then GitHub Pages deploy.

### Phase 2 — Polish existing components

After every component has Storybook coverage. Spacing, typography, hover/active
states, focus rings, transitions, keyboard UX, responsive behavior, a11y
refinements, API + visual consistency across the library. **No new components.**
(A future, more-capable-model pass will do the deep premium visual design here —
keep architecture flexible for it, but do not block on it.)

### Phase 3 — Expand the library

Only after coverage AND polish. New production-grade components, quality over
quantity. Priority: Tooltip, Popover, DropdownMenu, Accordion, Progress,
Skeleton, Toast, Breadcrumb, Pagination, Command palette, Drawer, Combobox,
MultiSelect, Calendar, DatePicker, DataTable, … Built on shared internals
(`Portal` + `useFocusTrap` done; `useControllableState`, `useDismiss`,
positioning next) + the `new:component` generator.

### Later

Token v2 primitive layer + density modes + `createTheme`; docs website
(`docs.genesiskit.dev`) separate from Storybook; `examples/next` + `examples/vite`;
visual regression; Changesets + release pipeline; README/marketing/launch → v1.0.
Post-v1.0: `npx genesiskit add <component>` CLI.

### Standing rules

Repo stays releasable after every milestone. Tests pass, Storybook builds, a11y
holds, backward compat preserved where practical. Stop for review after each
milestone. Each step keeps the per-component folder convention — scale it, don't
replace it.
