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

- Storybook (every component × every theme) → GitHub Pages.
- Docs site with live theme switcher and generated props tables.
- GitHub Actions CI: typecheck + lint + test + build + a11y + bundle-size.
- Changesets release automation.
- ESLint + Prettier + Stylelint.
- `.github` templates + a `npm run new:component` generator.
- README glow-up: hero, badges, theme gallery, StackBlitz playground.

## 5. Execution order

1. **Foundation sweep** — unify prefix, extract utils, add lint/CI,
   `"use client"`, package.json metadata. _(in progress)_
2. Fix the a11y audit list (Dialog, RadioGroup, Select, Card, Tabs).
3. Token v2 + real dark mode + `soft`/`sharp` schemes + `createTheme`.
4. Shared overlay internals → Phase A + B components.
5. Storybook + docs + visual tests.
6. Phase C/D + release pipeline + README/marketing → v1.0.

Each step keeps the per-component folder convention — that convention is the
thing to scale, not replace.
