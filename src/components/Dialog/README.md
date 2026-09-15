# Dialog

`Dialog` is an animated modal surface with accessible title/description
wiring, Escape handling, focus trap, body scroll lock, and a footer slot.

```tsx
<Dialog open={open} title="Delete project" onClose={() => setOpen(false)}>
  This action cannot be undone.
</Dialog>
```

Set `closeOnOverlayClick={false}` when the dialog must only close through an
explicit action.

Sizes: `sm` (24rem), `md` (32rem, default), `lg` (42rem). Use the size that
matches the content; small for confirmations, large for detailed content.