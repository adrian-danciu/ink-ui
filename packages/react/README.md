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

Button, IconButton, DropdownMenu, TextField, TextArea, Select, Combobox, Slider, Checkbox, Switch, RadioGroup, Rating, ToggleGroup, Card, Badge, Avatar, Separator, Skeleton, Chip, List, Table, Breadcrumbs, Pagination, Stepper, Alert, ProgressBar, Spinner, Tooltip, Tabs, Accordion, Dialog, Sheet, Toast, EmptyState, and Sidebar.

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

### List, Stepper, and Rating

`List` renders structured rows; pass `onItemSelect` and `selectedId` for controlled selection. `Stepper` shows progress through an ordered flow with a zero-based `activeStep`. `Rating` is a controlled star input with arrow-key navigation.

```tsx
<List items={[{ id: 'drafts', title: 'Drafts', description: 'Work in progress' }]} selectedId={selectedId} onItemSelect={setSelectedId} />
<Stepper steps={[{ label: 'Details' }, { label: 'Review' }, { label: 'Publish' }]} activeStep={1} />
<Rating label="Rate this collection" value={rating} onValueChange={setRating} />
```

### Spinner, ToggleGroup, and Table

Use `Spinner` as a labelled loading status. `ToggleGroup` is a controlled, single-choice button group. `Table` renders string or number cells in a scrollable semantic table.

```tsx
<Spinner label="Loading results" />
<ToggleGroup label="View" options={[{ label: 'Grid', value: 'grid' }, { label: 'List', value: 'list' }]} value={view} onValueChange={setView} />
<Table columns={[{ key: 'name', label: 'Name' }]} rows={[{ id: 'one', cells: { name: 'Ink UI' } }]} />
```

### Search, range, and overlays

`Combobox` searches a controlled single-select option list. `Slider` controls a numeric range. `DropdownMenu` offers action items, while `Sheet` displays an edge-anchored modal panel. `Tooltip` provides a short hint on hover, focus, or tap.

Web tooltips render in a viewport-level layer, so scroll containers do not clip them. The hint automatically moves below the trigger when there is not enough space above it.

```tsx
<Slider label="Intensity" value={intensity} onValueChange={setIntensity} step={5} />
<Combobox label="Category" options={categories} value={category} onValueChange={setCategory} />
<DropdownMenu label="Actions" items={[{ id: 'edit', label: 'Edit' }]} onItemSelect={handleAction} />
<Sheet open={open} onOpenChange={setOpen} title="Details">Content</Sheet>
<Tooltip label="Archive" content="Move this item to the archive.">?</Tooltip>
```
