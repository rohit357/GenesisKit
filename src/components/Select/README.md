# Select

`Select` is an accessible native single-choice control that supports composed
`option` elements, placeholder text, descriptions, and validation errors.

```tsx
<Select label="Country" placeholder="Choose a country" required>
  <option value="in">India</option>
  <option value="us">United States</option>
</Select>
```

Use `error` for a validation message. The component automatically sets
`aria-invalid="true"` and associates the description and error through
`aria-describedby`.

Sizes: `sm`, `md`, and `lg`.

