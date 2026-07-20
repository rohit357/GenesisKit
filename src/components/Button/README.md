# Button

Buttons communicate actions that a user can take. Use the semantic `Button`
component for actions, form submissions, and destructive confirmations.

```tsx
<Button variant="primary" size="md" onClick={saveChanges}>
  Save changes
</Button>
```

Variants: `primary`, `secondary`, `ghost`, and `danger`.

Sizes: `sm`, `md`, and `lg`.

Set `loading` while an action is pending. The button becomes disabled and
announces its busy state to assistive technology:

```tsx
<Button loading>Saving changes</Button>
```

