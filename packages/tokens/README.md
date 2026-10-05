# Ink UI tokens

The shared design foundation for Ink UI's React and React Native packages. It provides Poster, Paper, and Electric palettes in light and dark modes, configurable accent colors, and scales for spacing, typography, borders, and sizes. JavaScript values and generated CSS custom properties come from the same token source.

## Install

```sh
npm install @adrian-danciu/ink-ui-tokens
```

With Bun: `bun add @adrian-danciu/ink-ui-tokens`.

## Use in JavaScript

```ts
import { accents, themes, tokens } from '@adrian-danciu/ink-ui-tokens';

const paperCanvas = themes.paper.modes.light.canvas;
const red = accents.red.base;
```

## Use in CSS

```css
@import '@adrian-danciu/ink-ui-tokens/styles.css';

.example { padding: var(--ui-space-4); }
```

The source of truth is [`src/tokens.json`](https://github.com/adrian-danciu/ink-ui/blob/main/packages/tokens/src/tokens.json). Do not edit the generated CSS directly.
