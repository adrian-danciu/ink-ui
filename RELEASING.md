# Releasing Ink UI

The `0.1.0` packages were published manually. Later releases use [`.github/workflows/version-develop.yml`](.github/workflows/version-develop.yml) to apply Changesets on `develop`, then [`.github/workflows/publish.yml`](.github/workflows/publish.yml) to publish when `develop` is merged into `main`. `develop` never publishes. Only packages whose versions changed are published, with tokens first because the other packages depend on it.

## Changes in a pull request

From the repository root, run `bun run changeset` and select each package affected by the PR. Choose `patch`, `minor`, or `major`, then edit the generated Markdown file to describe the change. Commit that file with the PR into `develop`. A PR without a Changeset can merge, but it will not publish a new package version.

After a Changeset reaches `develop`, its workflow updates package versions and changelogs and commits them to `develop`. Wait for that workflow to finish, then merge `develop` into `main` through a pull request. The `main` workflow builds with Bun and publishes unpublished versions through npm trusted publishing. It can also be rerun manually and skips versions already on npm.

## One-time repository setup

1. Keep `develop` as the integration branch and require pull requests into `main` with zero required approvals. GitHub Actions only needs permission to push version commits to `develop`.
2. On npm, open **Settings → Trusted publishing** for each of `@adrian-danciu/ink-ui-tokens`, `@adrian-danciu/ink-ui`, and `@adrian-danciu/ink-ui-native`. Add a GitHub Actions trusted publisher with user `adrian-danciu`, repository `ink-ui`, and workflow filename `publish.yml`. Leave the environment name empty and enable direct `npm publish` for all three.
3. No npm write token is needed in GitHub secrets. The workflow requests a short-lived OIDC credential and uses npm CLI for publishing; Bun installs dependencies and builds the packages.

The workflow intentionally runs the package build but not the test suite.
