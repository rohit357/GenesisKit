# Input

`Input` is a labeled text field with built-in support for descriptions and
validation errors.

```tsx
<Input
  label="Email address"
  type="email"
  placeholder="you@example.com"
  description="We use this for account notifications."
  required
/>
```

Use `error` for a validation message. The input automatically receives
`aria-invalid="true"`, and both description and error content are associated
with the input through `aria-describedby`.

```tsx
<Input label="Password" type="password" error="Password is too short." />
```

Sizes: `sm`, `md`, and `lg`. Set `fullWidth` when the field should fill its
container.

