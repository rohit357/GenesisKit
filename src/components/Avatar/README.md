# Avatar

`Avatar` displays a profile image and falls back to initials when no image is
supplied or the image cannot load.

```tsx
<Avatar name="Ada Lovelace" src="/ada.jpg" />
```

Sizes: `sm`, `md`, `lg`, `xl`. Shapes: `circle`, `square`.

## Status indicator

`status` shows a presence dot at the bottom-right of the avatar. Values:
`none` (default, no dot), `online`, `busy`, `away`, `offline`. The dot is
decorative (`aria-hidden`) — status semantics belong on the surrounding
context, not the avatar itself.