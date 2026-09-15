# Alert

`Alert` communicates important feedback without interrupting the current task.

```tsx
<Alert status="success" title="Saved">Your changes are live.</Alert>
```

Statuses: `info`, `success`, `warning`, and `error`. Errors render with
`role="alert"` + `aria-live="assertive"`; other statuses use `role="status"` +
`aria-live="polite"`.

## Composition

- `icon` — leading ReactNode. Rendered as decorative so it does not duplicate
  the status announcement.
- `actions` — trailing ReactNode (typically `<Button>` elements for "Later",
  "Undo", "View details"). Rendered before the dismiss button.
- `dismissible` + `onDismiss` — renders a `role="button"` close affordance.

```tsx
<Alert
  status="warning"
  title="Item deleted"
  icon={<TrashIcon />}
  actions={<Button size="sm" variant="ghost">Undo</Button>}
  dismissible
  onDismiss={() => {}}
>
  The project has been moved to trash.
</Alert>
```