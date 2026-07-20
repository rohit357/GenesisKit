# Textarea

`Textarea` is a labeled multiline text field with built-in descriptions,
validation errors, size variants, and resize controls.

```tsx
<Textarea
  label="Comment"
  placeholder="Share your feedback"
  description="Please avoid sharing private information."
  rows={5}
  required
/>
```

Use `error` for a validation message. The component automatically sets
`aria-invalid="true"` and associates the message through `aria-describedby`.

Sizes: `sm`, `md`, and `lg`.

Resize modes: `none`, `vertical`, `horizontal`, and `both`.

