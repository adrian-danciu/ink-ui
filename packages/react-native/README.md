# Ink UI for React Native

Ink UI brings bold borders, offset shadows, and token-driven color to React Native and Expo. Choose from Poster, Paper, and Electric themes; each supports light and dark modes. Set an accent for the whole interface or override it on individual components.

## Install

```sh
npm install @adrian-danciu/ink-ui-native
```

With Bun: `bun add @adrian-danciu/ink-ui-native`.

React and React Native are peer dependencies and should be provided by your app or Expo project.

## Use

```tsx
import { Button, ThemeProvider } from '@adrian-danciu/ink-ui-native';

export function Example() {
  return <ThemeProvider theme="electric" mode="dark" accent="lime">
    <Button onPress={() => {}}>Continue</Button>
  </ThemeProvider>;
}
```

## Components

Button, IconButton, TextField, TextArea, Select, Checkbox, Switch, RadioGroup, Card, Badge, Avatar, Separator, Skeleton, Chip, Breadcrumbs, Pagination, SideNav, Alert, ProgressBar, Tabs, Accordion, Dialog, Toast, and EmptyState. Native `SideNav` uses an `onNavigate(href)` callback so the app can connect its router.

Native components use JavaScript tokens and do not require a CSS import. See the [source and documentation](https://github.com/adrian-danciu/ink-ui) for component examples.
