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

Variants: `elevated` (default), `outlined`, `soft`.

Padding: `sm`, `md` (default), and `lg`.

Use `interactive` for the hover-lift + cursor-pointer + focus ring visual
treatment. The prop is **visual only** — it does not add `role="button"`. To
make a card actionable, wrap it in your own `<button>` or `<Link>`:

```tsx
<button type="button" onClick={...} style={{ all: "unset", display: "block" }}>
  <Card interactive title="Project Aurora">...</Card>
</button>
```