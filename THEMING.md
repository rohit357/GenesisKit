# Theming GenesisKit

GenesisKit is designed to be themed through CSS custom properties. Import the
library stylesheet once, then use a theme class on an application or section.

```tsx
import "genesiskit/styles.css";

export function App() {
  return <main className="gk-theme-midnight">...</main>;
}
```

Built-in schemes are `gk-theme-genesis` (the default), `gk-theme-midnight`,
`gk-theme-emerald`, and `gk-theme-rose`. Themes can be nested to style a single
screen, panel, or embedded workflow differently from the surrounding app.

## Global tokens

Override global tokens on any container to tune the whole component set:

```css
.marketing-surface {
  --gk-color-primary: #7c3aed;
  --gk-color-primary-hover: #6d28d9;
  --gk-color-primary-soft: #f5f3ff;
  --gk-color-primary-border: #c4b5fd;
  --gk-radius-sm: 0.875rem;
  --gk-radius-md: 1.25rem;
}
```

Important tokens include `--gk-color-surface`, `--gk-color-text`,
`--gk-color-muted`, `--gk-color-border`, `--gk-color-primary`,
`--gk-focus-ring`, `--gk-shadow-md`, and `--gk-motion-fast`.

## Per-component overrides

Every visual component exposes local variables so a one-off customization does
not affect sibling components.

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

Useful local hooks include `--gk-field-*`, `--gk-card-*`, `--gk-badge-*`,
`--gk-alert-*`, `--gk-avatar-*`, `--gk-switch-*`, `--gk-tabs-*`, and
`--gk-dialog-*`.

