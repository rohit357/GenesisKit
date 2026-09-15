# Button

Buttons communicate actions that a user can take. Use the semantic `Button`
component for actions, form submissions, and destructive confirmations.

```tsx
<Button variant="primary" size="md" onClick={saveChanges}>
  Save changes
</Button>
```

## Variants

`primary`, `secondary`, `outline`, `soft`, `ghost`, `link`, `danger`, `gradient`.

| Variant    | When                                              |
| | |
| `primary`  | The page's main action. Default.                |
| `secondary`| An alternative alongside a primary.             |
| `outline`  | Less-emphasized CTAs; pairs with primary.       |
| `soft`     | Low-emphasis primary; subtle backgrounds.       |
| `ghost`    | Tertiary actions in toolbars and headers.       |
| `link`     | Inline-style actions; no chrome.                |
| `danger`   | Destructive confirmations.                      |
| `gradient` | Hero / marketing CTAs.                          |

## Sizes

`sm`, `md`, `lg`.

## Composition

Icons are passed as children — no dedicated slot prop. Use
`aria-hidden` on decorative icons:

```tsx
<Button>
  <PlusIcon aria-hidden />
  Create project
</Button>
```

For icon-only buttons, provide an accessible label directly:

```tsx
<Button variant="ghost" aria-label="Close">
  <CloseIcon aria-hidden />
</Button>
```

## Flagship flags

- `fullWidth` — stretches to fill the parent (mobile CTAs, form submits).
- `loading` — disabled + `aria-busy="true"` + spinner. Works with every
  variant.