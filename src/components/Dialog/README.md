# Dialog

`Dialog` is an animated modal surface with accessible title/description
wiring, Escape handling, overlay dismissal, and a footer slot.

```tsx
<Dialog open={open} title="Delete project" onClose={() => setOpen(false)}>
  This action cannot be undone.
</Dialog>
```

Set `closeOnOverlayClick={false}` when the dialog must only close through an
explicit action.

