# Releasing Ink UI

The `0.1.0` packages were published manually. Later releases use [`.github/workflows/publish.yml`](.github/workflows/publish.yml) when a PR is merged into `main`. `develop` does not publish. Only packages whose versions changed are published, with tokens first because the other packages depend on it.

## Changes in a pull request

From the repository root, run `bun run changeset` and select each package affected by the PR. Choose `patch`, `minor`, or `major`, then edit the generated Markdown file to describe the change. Commit that file with the PR. A PR without a Changeset can merge, but it will not publish a new package version.

Merging a PR with a Changeset into `main` starts the release workflow. It updates package versions and changelogs, commits those changes to `main`, builds with Bun, and publishes the unpublished versions through npm trusted publishing. The workflow can also be rerun manually; it skips versions already on npm.

## One-time repository setup

1. Create your `develop` branch and configure GitHub's `main` branch to require pull requests. Allow GitHub Actions to push its version commit to `main`; otherwise the release job will stop before publishing.
2. On npm, open **Settings → Trusted publishing** for each of `@adrian-danciu/ink-ui-tokens`, `@adrian-danciu/ink-ui`, and `@adrian-danciu/ink-ui-native`. Add a GitHub Actions trusted publisher with user `adrian-danciu`, repository `ink-ui`, and workflow filename `publish.yml`. Leave the environment name empty and enable direct `npm publish` for all three.
3. No npm write token is needed in GitHub secrets. The workflow requests a short-lived OIDC credential and uses npm CLI for publishing; Bun installs dependencies and builds the packages.

The workflow intentionally runs the package build but not the test suite.
