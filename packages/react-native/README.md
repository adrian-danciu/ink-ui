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

Button, IconButton, DropdownMenu, TextField, TextArea, Select, Combobox, Slider, Checkbox, Switch, RadioGroup, Rating, ToggleGroup, Card, Badge, Avatar, Separator, Skeleton, Chip, List, Table, Breadcrumbs, Pagination, Stepper, Sidebar, Alert, ProgressBar, Spinner, Tooltip, Tabs, Accordion, Dialog, Sheet, Toast, and EmptyState. Native `Sidebar` uses an `onNavigate(href)` callback so the app can connect its router.

Native components use JavaScript tokens and do not require a CSS import. See the [source and documentation](https://github.com/adrian-danciu/ink-ui) for component examples.

### Sidebar

`Sidebar` accepts `icon` and `iconPosition: 'left' | 'right'` on each link, plus a default `iconPosition` prop. Use `collapsible` for an inline icon rail. Supplying `mobileOpen` renders it in a native modal drawer with a close control and backdrop. Connect links to your navigation library through `onNavigate(href)`.

### List, Stepper, and Rating

`List` accepts rows with optional leading and trailing React Native elements, plus controlled `selectedId` and `onItemSelect`. `Stepper` displays a zero-based `activeStep`. `Rating` accepts a controlled value and `onValueChange` callback.

### Spinner, ToggleGroup, and Table

`Spinner` uses the native activity indicator with Ink UI's theme color and token sizes. `ToggleGroup` offers a controlled single choice. `Table` displays string or number cells in a horizontally scrollable grid.

### Search, range, and overlays

`Combobox` opens a searchable selection modal. `Slider` supports touch and accessibility increment/decrement actions. `DropdownMenu` presents a touch-friendly action modal; `Sheet` slides in from a chosen edge. `Tooltip` opens a dismissible hint on tap or long press. These components use the same controlled values and callbacks as their web counterparts.
