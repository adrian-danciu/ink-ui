# Ink UI for React

Ink UI brings bold borders, offset shadows, editorial typography, and token-driven color to React and Next.js. Choose from Poster, Paper, and Electric themes; each supports light and dark modes. Set an accent for the whole interface or override it on individual components.

## Install

```sh
npm install @adrian-danciu/ink-ui
```

With Bun: `bun add @adrian-danciu/ink-ui`.

React and React DOM are peer dependencies. In a Next.js app, import the stylesheet once from the root layout.

## Use

```tsx
import '@adrian-danciu/ink-ui/styles.css';
import { Button, ThemeProvider } from '@adrian-danciu/ink-ui';

export function Example() {
  return <ThemeProvider theme="paper" mode="light" accent="red">
    <Button accent="turquoise">Continue</Button>
  </ThemeProvider>;
}
```

## Components

Button, IconButton, TextField, TextArea, Select, Checkbox, Switch, RadioGroup, Card, Badge, Avatar, Separator, Skeleton, Chip, Breadcrumbs, Pagination, Alert, ProgressBar, Tabs, Accordion, Dialog, Toast, EmptyState, and Sidebar.

Styles are provided through one import: `@adrian-danciu/ink-ui/styles.css`. Tokens come from the `@adrian-danciu/ink-ui-tokens` dependency. See the [source and documentation](https://github.com/adrian-danciu/ink-ui) for component examples.

### Sidebar

`Sidebar` supports icons on either side of each link. Enable `collapsible` for a desktop icon rail. Pass `mobileOpen` and `onMobileOpenChange` to use its small-screen drawer; render your own menu button to set `mobileOpen` to `true`.

```tsx
<Sidebar
  collapsible
  mobileOpen={menuOpen}
  onMobileOpenChange={setMenuOpen}
  currentPath="/projects"
  groups={[{ title: 'Workspace', links: [
    { label: 'Overview', href: '/', icon: '⌂' },
    { label: 'Projects', href: '/projects', icon: '▦' },
    { label: 'Settings', href: '/settings', icon: '⚙', iconPosition: 'right' },
  ] }]}
/>
```

Use `onNavigate={(event, href) => { event.preventDefault(); router.push(href); }}` with a client router. Without it, links use normal browser navigation.
