# open-ui-kit

Accessible, composable, and framework-friendly UI components for the open web.

The project is intentionally component-first: every component has an isolated
folder containing its implementation, styles, tests, and usage notes.

## Status

This project is in early development. Available components are `Button`,
`Input`, `Card`, `Checkbox`, `Textarea`, and `Select`.

## Installation

```bash
npm install open-ui-kit
```

Import the component and the library stylesheet:

```tsx
import { Button } from "open-ui-kit";
import "open-ui-kit/styles.css";

export function App() {
  return <Button>Get started</Button>;
}
```

## Development

```bash
npm install
npm run check
npm run dev
```

## Design principles

- Accessibility is a feature, not an add-on.
- Components should be useful without a design-system lock-in.
- Public APIs should stay small, predictable, and typed.
- CSS should be portable and easy to override.
- Contributions should be easy to review and test.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

MIT © open-ui-kit contributors
