# Ink UI

A Bun workspace for a publishable React and React Native component library. It has three visual styles (`poster`, `paper`, `electric`), each with light and dark modes. Accent colors can be selected at the provider or Button level. Ink UI is the working brand name; the npm scope is still a placeholder.

<img width="1173" height="630" alt="image" src="https://github.com/user-attachments/assets/5aa68edd-9b6d-4a2f-9c61-3889388be57a" />
<img width="1720" height="598" alt="image" src="https://github.com/user-attachments/assets/907a30fb-cebf-4d60-a759-b9eb202549e9" />
<img width="998" height="1299" alt="image" src="https://github.com/user-attachments/assets/058085f5-4f92-4a54-be17-07dfed25e9ae" />

## Start the documentation

From the repository root:

```sh
bun install
bun run docs
```

Open <http://localhost:3001/>. The docs are built with our own React components and include a sidebar, theme controls, live examples, usage snippets, and prop summaries for the current web component set. Refresh the browser after editing; live module replacement is disabled to avoid the Bun bundled-module error. Stop the server with Ctrl+C.

## Start the component preview

From the repository root:

```sh
bun install
bun run dev
```

Open <http://localhost:3000/>. `bun run dev` builds the web packages and starts the preview server. `bun run preview` is an alias for the same command. Refresh the browser after editing; live module replacement is disabled to avoid the Bun bundled-module error. Stop the server with Ctrl+C.

## Packages

- `@ui-library/tokens`: the single token source in `packages/tokens/src/tokens.json`, plus generated CSS custom properties for web.
- `@ui-library/react`: web components for React and Next.js.
- `@ui-library/react-native`: native components for React Native and Expo.

Each component has a named folder in `src/components/`. The web folder contains `Component.tsx` and `style.css` side by side; `styles.css` imports the complete set. React Native uses the same folder structure, with token-based style values in the component TSX file because it does not use CSS. The `src/index.tsx` files are public export lists, and shared native theme helpers live in `src/theme.tsx`.

The component set includes Button, TextField, Card, Badge, Checkbox, Switch, RadioGroup, Alert, ProgressBar, TextArea, Tabs, Accordion, EmptyState, Select, Dialog, Toast, and IconButton on web and native. The web package also includes Sidebar for documentation and other navigation layouts. Platform props follow their respective React DOM and React Native APIs where needed.

Web components use CSS custom properties exclusively for library colors, spacing, sizing, typography, radii, and breakpoints. React Native cannot use CSS variables, so its components read the same token values as JavaScript numbers and color strings. Breakpoint values are available as CSS custom properties for reference; CSS media queries require their numeric values to be emitted directly when responsive components are added.

## Develop

Install [Bun](https://bun.sh/docs/installation), then run:

```sh
bun install
bun run check
```

`bun run check` builds all three packages, checks web, native, preview, and docs TypeScript, and runs the token and web rendering tests. Generated CSS lives at `packages/tokens/styles.css`; edit the JSON source and rebuild instead of editing the CSS.

## Preview components

The local playground shows one style at a time. Use the Poster, Paper, and Electric tabs above the mode and accent controls to switch styles. Each style has a direct URL (`?theme=poster`, `?theme=paper`, or `?theme=electric`) that can be linked from docs pages. The seventeen original components are available in each style; Sidebar is shown in its docs page. Try the fields and selection controls, open a dialog, dismiss a toast, and press Tab to inspect keyboard focus.

## Use locally

```tsx
import '@ui-library/react/styles.css';
import { Button, ThemeProvider } from '@ui-library/react';

<ThemeProvider theme="paper" mode="light" accent="red">
  <Button accent="turquoise">Continue</Button>
</ThemeProvider>
```

```tsx
import { Button, ThemeProvider } from '@ui-library/react-native';

<ThemeProvider theme="electric" mode="dark" accent="lime">
  <Button accent="yellow" onPress={() => {}}>Continue</Button>
</ThemeProvider>
```

## Before publishing

The `@ui-library` scope is a placeholder. Choose an npm scope and license, then rename the packages and release them with Changesets. No package has been published.

## Next design step

Refine the `poster`, `paper`, and `electric` palettes in `tokens.json` as the design direction develops. Each style has a light and dark surface palette. Accent colors are a separate scale shared across all styles and can be changed independently. The foundational visual rules are captured in `DESIGN-DIRECTION.md`.
