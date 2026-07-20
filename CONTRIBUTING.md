# Contributing

Thanks for helping make open-ui-kit better.

## Local setup

1. Fork and clone the repository.
2. Run `npm install`.
3. Run `npm run check` before committing.

## Adding a component

Create a dedicated folder under `src/components/<ComponentName>/` containing:

- the component implementation and public types;
- styles that do not leak global selectors;
- focused tests for behavior and accessibility;
- a short `README.md` with examples;
- an `index.ts` barrel file.

Export the component from `src/index.ts` only after its tests pass.

## Pull requests

Keep pull requests focused, explain the user-facing behavior, and include tests
for changes. Breaking public API changes should be called out clearly.

