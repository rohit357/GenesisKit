# Checkbox

`Checkbox` is an accessible native checkbox with built-in support for labels,
help text, validation errors, required state, and mixed selection.

```tsx
<Checkbox
  label="Subscribe to newsletter"
  description="Receive product updates once a month."
  checked={subscribed}
  onChange={(event) => setSubscribed(event.target.checked)}
/>
```

Use `indeterminate` for a partially selected parent control, such as “Select
all” when only some rows are selected.

```tsx
<Checkbox label="Select all" indeterminate />
```

Sizes: `sm` and `md`.

