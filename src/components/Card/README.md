# Card

`Card` groups related content into a bordered or elevated surface. It supports
an optional title, description, header action, body content, and footer.

```tsx
<Card
  title="Account settings"
  description="Manage your profile and notification preferences."
  headerAction={<Button variant="ghost">Edit</Button>}
  footer={<Button>Save changes</Button>}
>
  <p>Your account details go here.</p>
</Card>
```

Variants: `elevated` and `outlined`.

Padding: `sm`, `md`, and `lg`.

