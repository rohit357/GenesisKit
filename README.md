<!-- Hero Banner -->

# GenesisKit

**An accessible, themeable React component library and design system — built with TypeScript.**

GenesisKit is an open-source React UI library of small, predictable, accessible components. Every component ships with real ARIA wiring, keyboard support, CSS-variable theming, and full TypeScript types — so you can build polished, consistent interfaces without fighting your design system.

<!-- Component Showcase -->

<p>
  <a href="https://www.npmjs.com/package/genesiskit"><img alt="npm version" src="https://img.shields.io/npm/v/genesiskit.svg?logo=npm"></a>
  <a href="https://github.com/rohit357/GenesisKit/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/rohit357/GenesisKit/actions/workflows/ci.yml/badge.svg"></a>
  <a href="https://github.com/rohit357/GenesisKit/actions/workflows/deploy-storybook.yml"><img alt="GitHub Pages" src="https://github.com/rohit357/GenesisKit/actions/workflows/deploy-storybook.yml/badge.svg"></a>
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white">
  <img alt="Storybook" src="https://img.shields.io/badge/Storybook-live-ff4785?logo=storybook&logoColor=white">
  <a href="https://github.com/rohit357/GenesisKit/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/rohit357/GenesisKit?style=social"></a>
</p>

---

## Introduction

GenesisKit gives you a set of production-ready building blocks — buttons, form fields, overlays, and feedback components — that behave correctly out of the box. It is intentionally **component-first**: each component lives in its own isolated folder with its implementation, styles, tests, and usage notes, so the library stays easy to read, review, and extend.

The result is a lightweight React component library that works as a standalone toolkit or as the foundation of your own design system.

## Features

- ♿ **Accessible by default** — real ARIA roles, labels, focus management, and keyboard navigation, not bolted on afterward.
- 🎨 **Themeable via CSS variables** — swap the entire look with a single class; ships with four themes.
- 🧩 **Component-first architecture** — every component is isolated, tested, and documented.
- 🔒 **Fully typed** — written in strict TypeScript with exported prop and variant types.
- 🌗 **Dark mode ready** — a bundled `midnight` theme plus `prefers-color-scheme` friendly tokens.
- 🪶 **Portable CSS** — plain CSS variables and BEM-style classes, easy to override without lock-in.
- 📦 **Dual ESM + CJS** — modern bundlers and legacy tooling both supported, with matching type definitions.
- 🎛️ **Design tokens** — a shared spacing, typography, color, and motion scale keeps components consistent.
- 🚫 **Reduced-motion aware** — animations respect `prefers-reduced-motion`.

## Why GenesisKit?

Many component libraries force a design-system lock-in, ship heavy runtime dependencies, or trade accessibility for visuals. GenesisKit takes a different stance:

- **Small, predictable APIs** — props stay minimal and typed; no surprise abstractions.
- **No styling lock-in** — theme with CSS variables you already understand, or override the classes directly.
- **Accessibility is a feature** — every interactive component is keyboard- and screen-reader-tested.
- **Zero-runtime styling** — styles are plain CSS, not a runtime CSS-in-JS engine.
- **Readable source** — the isolated-folder pattern makes it easy to audit exactly what a component does.

## Installation

```bash
npm install genesiskit
```

Peer dependencies: `react >= 18` and `react-dom >= 18`.

## Quick Start

Import the component and the library stylesheet once at your app entry point:

```tsx
import { Button } from "genesiskit";
import "genesiskit/styles.css";

export function App() {
  return (
    <Button variant="primary" size="md">
      Get started
    </Button>
  );
}
```

A slightly richer example with a form field and feedback:

```tsx
import { Input, Button, Alert } from "genesiskit";
import "genesiskit/styles.css";

export function SignupForm() {
  return (
    <form>
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        description="We'll never share your address."
      />
      <Alert status="success" title="You're on the list!" />
      <Button variant="primary">Subscribe</Button>
    </form>
  );
}
```

## Theme System

Themes are scoped with a single class on any container. Everything inside inherits the scheme — no provider or JavaScript required:

```tsx
<div className="gk-theme-midnight">
  <Button>Themed in dark mode</Button>
</div>
```

Built-in themes:

| Theme | Class | Description |
| --- | --- | --- |
| Genesis | `gk-theme-genesis` | Default light theme (also the `:root` default). |
| Midnight | `gk-theme-midnight` | Dark theme. |
| Emerald | `gk-theme-emerald` | Green primary accent. |
| Rose | `gk-theme-rose` | Pink/red primary accent. |

## Components

Fourteen components are available today:

| Component | Description |
| --- | --- |
| `Button` | Primary, secondary, ghost, and danger variants with a loading state. |
| `Input` | Labeled text field with description, error, and size options. |
| `Card` | Content surface with configurable heading level and semantics. |
| `Checkbox` | Accessible checkbox with label, description, and error. |
| `Textarea` | Multiline text field with resize control. |
| `Select` | Native select with a custom chevron and placeholder handling. |
| `Badge` | Compact status/label pill with semantic variants. |
| `Alert` | Info, success, warning, and error messages with optional dismiss. |
| `Spinner` | Accessible loading indicator. |
| `Avatar` | Image or initials avatar in circle/square shapes. |
| `Switch` | Toggle control with label and description. |
| `RadioGroup` | Grouped radio options with auto-generated names and required support. |
| `Tabs` | Tabbed panels with automatic/manual activation and `keepMounted`. |
| `Dialog` | Modal dialog with focus trap, scroll lock, and return-focus. |

## Storybook

The live component playground doubles as the public demo, with a theme switcher for every scheme.

<!-- Storybook Preview -->

🔗 **Live demo:** `<STORYBOOK_URL>` _(GitHub Pages — link to be added once Pages is enabled)_

Run it locally:

```bash
npm run storybook
```

## Documentation

- **Component playground:** Storybook (link above), with autodocs and prop tables for every component.
- **Usage notes:** each component folder contains a `README.md` with props and examples.
- **Theming:** see [Theming & Design Tokens](#theming--design-tokens) below.

<!-- GIF Demo -->

## Accessibility

Accessibility is a core requirement, not an afterthought:

- Semantic ARIA roles, labels, and `aria-describedby` wiring across components.
- Full keyboard support, including roving `tabindex` in `Tabs` and a focus trap in `Dialog`.
- Visible focus rings on every interactive element.
- `prefers-reduced-motion` respected throughout.
- Accessibility checks run in Storybook via the a11y addon.

## TypeScript Support

GenesisKit is written in strict TypeScript and ships complete type definitions for both ESM and CJS consumers. Every component exports its props and variant unions:

```tsx
import { Button, type ButtonProps, type ButtonVariant } from "genesiskit";

const variant: ButtonVariant = "secondary";
const props: ButtonProps = { variant, size: "lg" };
```

## Theming & Design Tokens

GenesisKit is styled entirely with CSS custom properties, organized into layers:

- **Design tokens** — a shared scale for color, spacing, typography, radius, shadow, and motion.
- **Theme scopes** — token overrides applied by a `gk-theme-*` class.
- **Component hooks** — per-component variables (e.g. `--gk-button-bg`) for fine-grained overrides.

Override a token globally, per theme, or per instance:

```css
/* Global override */
:root {
  --gk-color-primary: #7c3aed;
}

/* Per-instance override */
.my-cta {
  --gk-button-radius: 999px;
}
```

## Development

```bash
npm install         # install dependencies
npm run dev         # build in watch mode
npm run check       # typecheck + lint + format:check + test + build
npm run test        # run the test suite
npm run storybook   # start Storybook locally
```

`npm run check` runs the full gate used in CI — keep it green before every commit.

## Roadmap

High-level direction:

1. **Storybook coverage** — a documented story for every component _(complete)_.
2. **Polish & consistency** — a unified design-token scale, spacing, typography, and interaction quality across the library _(in progress)_.
3. **More components** — overlays, navigation, and data components built on shared internals.
4. **Design tokens v2 & docs site** — expanded theming, density modes, and a dedicated documentation website.

APIs stay stable where practical, and the library remains releasable at every step.

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request, and make sure `npm run check` passes. Bug reports and feature requests can go through [GitHub Issues](https://github.com/rohit357/GenesisKit/issues).

## License

[MIT](LICENSE) © GenesisKit contributors
