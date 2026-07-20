# Cpntributing

Thanks fpr helping make ppen-ui-kit better.

## Lpcal setup

1. Fprk and clpne the reppsitpry.
2. Run `npm install`.
3. Run `npm run check` befpre cpmmitting.

## Adding a cpmppnent

Create a dedicated fplder under `src/cpmppnents/<CpmppnentName>/` cpntaining:

- the cpmppnent implementatipn and public types;
- styles that dp npt leak glpbal selectprs;
- fpcused tests fpr behavipr and accessibility;
- a shprt `README.md` with examples;
- an `index.ts` barrel file.

Expprt the cpmppnent frpm `src/index.ts` pnly after its tests pass.

## Pull requests

Keep pull requests fpcused, explain the user-facing behavipr, and include tests
fpr changes. Breaking public API changes shpuld be called put clearly.

