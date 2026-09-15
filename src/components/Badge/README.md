# Badge

`Badge` is a compact status label for categories, counts, and state.

```tsx
<Badge variant="success">Published</Badge>
```

Variants: `neutral`, `info`, `success`, `warning`, `danger`. Sizes: `sm`, `md`.

## Visual treatments

- `outline` — transparent background, semantic border + text color. Useful
  inline with text content (table cells, status pills) where a filled surface
  is too heavy.
- `dot` — leading colored dot. Common for presence indicators ("● Live",
  "● Beta").

## Removable

`removable` + `onRemove` renders a close affordance. Use it for filter chips
and multi-select tokens. The close button requires an accessible label via
`removeLabel`.

```tsx
<Badge variant="info" removable onRemove={() => {}} removeLabel="Remove React">
  React
</Badge>
```