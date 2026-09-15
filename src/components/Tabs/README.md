# Tabs

`Tabs` provides accessible, keyboard-navigable content panels.

```tsx
<Tabs items={[{ value: "details", label: "Details", content: <Details /> }]} />
```

Tabs support horizontal and vertical orientations, controlled or uncontrolled
selection, disabled tabs, and Home/End/arrow-key navigation.

## Variants

- `underline` (default) — classic tab row with an active underline.
- `pills` — each tab rendered as a soft pill; active uses the primary
  background + primary foreground. Good for in-page filtering and tool
  switchers.

## Behavior flags

- `activationMode="manual"` — arrows/Home/End only move focus; Enter/Space
  selects.
- `keepMounted` — inactive panels stay mounted (hidden) so their state
  (e.g. form inputs) survives tab switches.