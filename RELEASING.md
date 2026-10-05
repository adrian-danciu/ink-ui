# Releasing Ink UI

The three public packages are `@adrian-danciu/ink-ui-tokens`, `@adrian-danciu/ink-ui`, and `@adrian-danciu/ink-ui-native`. The docs and preview apps are private workspaces. The first planned version is `0.1.0` for each package.

## Before the first release

1. Confirm that the repository and all three packages contain the MIT license.
2. Confirm that the `@adrian-danciu` npm account can publish from this machine (`bun pm whoami`) and that two-factor authentication is ready.
3. Run `bun install` and `bun run build` at the repository root. Review each package with `bun pm pack --dry-run` from its directory.
4. Install the packed packages in a separate React app and a separate React Native app, then check the documented imports and basic component rendering before publishing.

## Publish

Publish tokens first, because the other two packages depend on `@adrian-danciu/ink-ui-tokens@^0.1.0`. From each package directory, use `bun publish --access public` in this order:

1. `packages/tokens`
2. `packages/react`
3. `packages/react-native`

Only publish after reviewing the exact tarball contents and versions. Publishing a version is permanent. For later releases, use Changesets to update package versions and changelogs before publishing.
