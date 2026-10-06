# Working on Ink UI

Ink UI is a public, MIT-licensed component library for React/Next.js and React Native. It uses Bun workspaces, TypeScript, and a shared design-token package. The web and native packages have separate rendering code but share the same visual foundations. Do not introduce Tamagui or another styling framework. Angular is a possible future target, not an existing package.

## Start here

- Use Bun 1.4.2, as pinned in the root `package.json`. From the repository root, run `bun install --frozen-lockfile` after cloning.
- Run `bun run preview` for the component preview at `http://localhost:3000`.
- Run `bun run docs` for the documentation app at `http://localhost:3001`.
- Preview and docs build the React package once when started. If you edit a web component's TSX while either server stays open, run `bun --filter @adrian-danciu/ink-ui build` and reload the browser tab. Otherwise, updated CSS can appear alongside stale component JavaScript.
- Stop preview or docs servers you start when your task is finished, unless the user asks to keep them running.
- Read `DESIGN-DIRECTION.md` for visual intent, the relevant package README for consumer usage, and `RELEASING.md` before release work. Some early open-decision wording in the design document predates the Ink UI name and npm release; current code and package manifests take precedence.

## Repository map

| Path | Purpose |
| --- | --- |
| `packages/tokens` | `@adrian-danciu/ink-ui-tokens`: the shared token source, TypeScript exports, and generated web CSS variables. |
| `packages/react` | `@adrian-danciu/ink-ui`: React/Next.js components and one consumer stylesheet. |
| `packages/react-native` | `@adrian-danciu/ink-ui-native`: React Native/Expo components using token values in JavaScript styles. |
| `apps/preview` | Bun-hosted, interactive visual preview of themes, modes, accents, and components. |
| `apps/docs` | Bun-hosted documentation site, component pages, and live examples. |
| `.changeset` | Changesets configuration and pending release notes. |
| `.github/workflows` | Versioning on `develop` and npm publishing from `main`. |

The root `package.json` is private and is not published. The three packages under `packages/` are published independently. React and React Native are peer dependencies of their respective UI packages.

## Design and implementation rules

- Preserve the brutalist, neo-brutalist, and editorial paper direction: strong borders, hard offset shadows, clear grids, bold type, and visible focus states. Keep controls usable without decorative assets.
- Support all three theme styles (`poster`, `paper`, `electric`) in both `light` and `dark` modes. Accent selection is independent of theme and mode; the current accents are `red`, `turquoise`, `yellow`, `lime`, `purple`, and `pink`.
- `packages/tokens/src/tokens.json` is the source of truth for colors, spacing, component sizes, typography, breakpoints, borders, shadows, and other shared values. Edit it instead of scattering literal design values through components. The token build generates `packages/tokens/styles.css`; do not hand-edit that generated file.
- On web, use the generated `--ui-*` CSS variables for styling. Consumers import `@adrian-danciu/ink-ui/styles.css` once. `packages/react/styles.css` collects the token, base, provider, and component styles.
- Keep each web component in `packages/react/src/components/ComponentName/` with `ComponentName.tsx` and `style.css` together. Export its API from `packages/react/src/index.tsx` and import its stylesheet from `packages/react/styles.css`.
- Keep each native component in its own `packages/react-native/src/components/ComponentName/ComponentName.tsx`. Export its API from `packages/react-native/src/index.tsx`. Native uses `packages/react-native/src/theme.tsx` and token values; it does not consume CSS.
- Maintain a consistent public API and behavior across web and native where the platforms permit it. Use platform-appropriate accessibility and interaction primitives rather than copying DOM code into native.
- When adding or changing a public component, update the relevant package README, the visual preview in `apps/preview/main.tsx`, and the docs metadata/examples in `apps/docs/pages.ts` and `apps/docs/examples.tsx` as appropriate. Keep package exports and published files in the package manifests accurate.

## Commands and verification

- `bun run build` builds tokens, React, and React Native in dependency order.
- Package-specific type checks are available through `bun --filter @adrian-danciu/ink-ui typecheck`, `bun --filter @adrian-danciu/ink-ui-native typecheck`, and the docs/preview `typecheck` scripts.
- `bun run check` includes builds, type checks, and `bun test`. **Do not run the test suite or broad checks for routine edits unless the user asks.** Choose only the focused verification needed for the requested change, and report what you did and did not verify.
- Do not run `bun run release`, `npm publish`, or a manual publish workflow unless the user explicitly requests a release. `bun run release` includes the test suite and publishes packages.

## Branches and releases

- `develop` is the integration branch. `main` is protected: changes enter through pull requests, with zero required review approvals. Only merges to `main` can publish packages.
- For a publishable package change, run `bun run changeset`, select affected packages and the appropriate patch/minor/major bump, and commit the generated Changeset with the PR into `develop`. A documentation-only or private-app change normally needs no Changeset.
- After a Changeset reaches `develop`, `.github/workflows/version-develop.yml` consumes it and commits package version, changelog, and lockfile updates to `develop`. Wait for that workflow before opening or merging the `develop` → `main` release PR.
- Merging `develop` into `main` runs `.github/workflows/publish.yml`. It builds with Bun and publishes only package versions absent from npm, using npm trusted publishing. Tokens publish before the UI packages. Do not hand-edit versions to bypass Changesets.
- See `RELEASING.md` for the full release sequence. Never add npm credentials, personal tokens, or other secrets to the repository.

## Scope and handoff

Keep changes focused on the requested task. Preserve existing public APIs unless a breaking change is intentional and recorded with a major Changeset. In the handoff, identify changed files, commands run, and any remaining limitation. Do not claim a native, browser, or npm release path was verified unless it was actually exercised.
