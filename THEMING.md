# Theming GenesisKit

GenesisKit is built around a CSS-first customization architecture. Everything
visual flows through one stack:

```
primitive tokens  →  semantic theme tokens  →  component hooks  →
variants / states  →  consumer overrides
```

You can intervene at **any** layer. Most apps need only layer 1 (pick a
theme). Brand-driven apps override layer 4 (per-component style hooks).
Power users override layer 0 (primitive tokens).

```tsx
import "genesiskit/styles.css";

export function App() {
  return <main className="gk-theme-midnight">…</main>;
}
```

## 1. Theme classes

Built-in schemes: `gk-theme-genesis` (the default), `gk-theme-midnight`,
`gk-theme-emerald`, `gk-theme-rose`. Themes can be nested.

```tsx
<div className="gk-theme-emerald">
  <section className="gk-theme-rose">…this section in rose…</section>
</div>
```

## 2. Density

Apply `data-density="compact"` on any container to shift spacing and
typography one step tighter across the whole library. Comfortable is the
default; no attribute means no shift.

```tsx
<html data-density="compact">…</html>
<section data-density="compact">…</section>
```

Compact shifts `--gk-space-*` and `--gk-font-size-*` tokens. Physical
control dimensions (button min-height, avatar size, switch dimensions)
remain unchanged so taps and clicks stay accessible.

## 3. Personality presets

Personality classes layer on top of any theme:

| Class                  | Feel                                                    |
| | |
| `gk-personality-soft`  | Larger radii, softer shadows, gentler surface contrast. |
| `gk-personality-sharp` | Minimal radii, stronger borders, geometric feel.        |
| `gk-personality-glass` | Translucent surfaces + backdrop blur on elevated cards, dialogs, alerts. |

They compose with themes:

```tsx
<div className="gk-theme-midnight gk-personality-glass">…</div>
<div className="gk-theme-emerald gk-personality-soft">…</div>
<div className="gk-theme-genesis gk-personality-sharp">…</div>
```

The glass preset falls back gracefully when `backdrop-filter` is unsupported.

## 4. Component customization hooks

Every component exposes local CSS variables for one-off customization:

```tsx
<Button
  style={{
    "--gk-button-bg": "#0f172a",
    "--gk-button-hover-bg": "#334155",
    "--gk-button-radius": "999px"
  } as React.CSSProperties}
>
  Launch
</Button>
```

Useful local hooks: `--gk-field-*`, `--gk-card-*`, `--gk-badge-*`,
`--gk-alert-*`, `--gk-avatar-*`, `--gk-switch-*`, `--gk-tabs-*`,
`--gk-dialog-*`, `--gk-button-{primary,secondary,outline,soft,ghost,link,gradient,danger}-*`.

## 5. Global token overrides

Override any primitive or semantic token at any level:

```css
.marketing-surface {
  --gk-color-primary: #7c3aed;
  --gk-color-primary-hover: #6d28d9;
  --gk-color-primary-soft: #f5f3ff;
  --gk-color-primary-border: #c4b5fd;
  --gk-radius-md: 1.25rem; /* use --gk-radius-xl too */
  --gk-radius-xl: 1.5rem;
}
```

## 6. Primitive token reference (selection)

| Token                   | Use                            |
| | |
| `--gk-color-canvas`     | Page background                |
| `--gk-color-surface`    | Cards, dialogs, fields         |
| `--gk-color-surface-subtle` | Soft cards, footer bg       |
| `--gk-color-text`       | Body text                      |
| `--gk-color-heading`    | Titles, dialog headings        |
| `--gk-color-muted`      | Descriptions, helper text      |
| `--gk-color-border`     | Field borders                  |
| `--gk-color-primary`    | Brand color (themable)         |
| `--gk-focus-ring`       | Focus outline color            |
| `--gk-shadow-{sm,md,lg}`| Elevation tiers                |
| `--gk-radius-{sm,md,lg,xl,full}` | Shape scale            |
| `--gk-motion-{fast,enter,emphasis}` + `--gk-ease-{standard,out}` | Motion |

## 7. `createTheme()` — investigation deferred

A `createTheme()` JS helper is **not** shipped in this milestone. The
CSS-first architecture already lets consumers override any token at any
layer via plain CSS — adding a runtime JS helper at this stage would
duplicate capability without proportional value.

If you want one-off branded themes today, drop a `.css` file with token
overrides on a class and apply that class on your root:

```css
.brand-acme {
  --gk-color-primary: #7c3aed;
  --gk-color-primary-hover: #6d28d9;
}
```

```tsx
<div className="brand-acme gk-theme-genesis">…</div>
```

A small typed helper may land later if a recurring pattern emerges. Until
then, plain CSS is the path.