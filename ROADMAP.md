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

1. **Foundation sweep** — extract utils, add lint/CI, package.json metadata.
   _(done; leftovers → step 3: prefix unification, `"use client"`)_
2. Fix the a11y audit list — Dialog _(done)_, RadioGroup _(done)_, Select,
   Card, Tabs.
3. **Consistency + release readiness** — unify `oui-`/`gk-` prefix (one
   mechanical sweep across classes + tokens, before any new components),
   `"use client"` strategy, npm package readiness checks (publint /
   attw / pack review), Changesets bootstrap. Cheap now, expensive after
   more components exist.
4. Token v2 + real dark mode + `soft`/`sharp` schemes + `createTheme` +
   density modes.
5. Shared overlay internals (`Portal` + `useFocusTrap` done;
   `useControllableState`, `useDismiss`, positioning next) +
   `new:component` generator → Phase A + B components.
6. Storybook (= demo site) + docs + a11y CI + visual tests +
   `examples/next` + `examples/vite`.
7. Phase C/D + release pipeline hardening + README/marketing/launch → v1.0.

### Post-v1.0 (long-term, only after the library is stable)

- **CLI** — `npx genesiskit add button` copies a component's folder into a
  consumer app (shadcn-style). Depends on stable component APIs + unified
  prefix + docs site for CLI documentation. Do not start before v1.0.

Each step keeps the per-component folder convention — that convention is the
thing to scale, not replace. Future extensibility rides on the same pattern:
public hooks (`useToast`, `useControllableState`), a small utility layer
(`src/utils`), layout primitives, then boilerplate blocks/templates — each
still one isolated folder.
