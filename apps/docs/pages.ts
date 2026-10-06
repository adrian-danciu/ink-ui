export interface PropRow {
  name: string;
  type: string;
  description: string;
}

export interface ComponentPage {
  slug: string;
  name: string;
  category: 'Actions' | 'Forms' | 'Content' | 'Feedback' | 'Navigation';
  description: string;
  code: string;
  props: readonly PropRow[];
}

export const componentPages: readonly ComponentPage[] = [
  {
    slug: 'button', name: 'Button', category: 'Actions',
    description: 'A clear action with three sizes, two visual variants, and optional accent overrides.',
    code: `<Button size="md" variant="primary" onClick={handleClick}>\n  Publish\n</Button>`,
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Button height and padding. Default: md.' },
      { name: 'variant', type: "'primary' | 'secondary'", description: 'Filled or outlined treatment. Default: primary.' },
      { name: 'accent', type: 'AccentName', description: 'Overrides the active theme accent for this button.' },
      { name: 'disabled', type: 'boolean', description: 'Prevents activation and applies the disabled style.' },
    ],
  },
  {
    slug: 'icon-button', name: 'IconButton', category: 'Actions',
    description: 'A compact icon action with a required accessible label.',
    code: `<IconButton label="Add favorite" icon="★" onClick={handleClick} />`,
    props: [
      { name: 'label', type: 'string', description: 'Required accessible name and tooltip text.' },
      { name: 'icon', type: 'ReactNode', description: 'Visible icon; hidden from assistive technology.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Control size. Default: md.' },
      { name: 'variant', type: "'primary' | 'secondary'", description: 'Default: secondary.' },
      { name: 'accent', type: 'AccentName', description: 'Overrides the active accent.' },
    ],
  },
  {
    slug: 'text-field', name: 'TextField', category: 'Forms',
    description: 'A labelled single-line input with helper and error messaging.',
    code: `<TextField label="Search" placeholder="Enter a keyword"\n  value={query} onChange={event => setQuery(event.currentTarget.value)} />`,
    props: [
      { name: 'label', type: 'string', description: 'Visible label associated with the input.' },
      { name: 'helperText', type: 'string', description: 'Supporting guidance below the input.' },
      { name: 'errorText', type: 'string', description: 'Error message; sets aria-invalid.' },
      { name: 'value / onChange', type: 'HTML input props', description: 'Controlled input value and change handler.' },
    ],
  },
  {
    slug: 'text-area', name: 'TextArea', category: 'Forms',
    description: 'A labelled multi-line field for longer notes and descriptions.',
    code: `<TextArea label="Notes" value={note}\n  onChange={event => setNote(event.currentTarget.value)}\n  helperText="Keep it concise." />`,
    props: [
      { name: 'label', type: 'string', description: 'Visible label associated with the textarea.' },
      { name: 'helperText', type: 'string', description: 'Supporting guidance below the field.' },
      { name: 'errorText', type: 'string', description: 'Error message; sets aria-invalid.' },
      { name: 'rows', type: 'number', description: 'Visible text rows. Default: 4.' },
    ],
  },
  {
    slug: 'checkbox', name: 'Checkbox', category: 'Forms',
    description: 'A controlled binary choice with a full-label hit area.',
    code: `<Checkbox label="Add to collection" checked={checked}\n  onCheckedChange={setChecked} />`,
    props: [
      { name: 'label', type: 'string', description: 'Text shown beside the box.' },
      { name: 'checked', type: 'boolean', description: 'Current checked state.' },
      { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Called when the state changes.' },
      { name: 'disabled', type: 'boolean', description: 'Disables the control.' },
      { name: 'accent', type: 'AccentName', description: 'Overrides the active accent.' },
    ],
  },
  {
    slug: 'switch', name: 'Switch', category: 'Forms',
    description: 'A controlled on/off setting for immediate state changes.',
    code: `<Switch label="Live updates" checked={enabled}\n  onCheckedChange={setEnabled} />`,
    props: [
      { name: 'label', type: 'string', description: 'Visible and accessible setting name.' },
      { name: 'checked', type: 'boolean', description: 'Current on/off state.' },
      { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Called on activation.' },
      { name: 'disabled', type: 'boolean', description: 'Disables the setting.' },
      { name: 'accent', type: 'AccentName', description: 'Overrides the active accent.' },
    ],
  },
  {
    slug: 'radio-group', name: 'RadioGroup', category: 'Forms',
    description: 'A labelled set of mutually exclusive choices.',
    code: `<RadioGroup label="Frequency" value={frequency}\n  onValueChange={setFrequency}\n  options={[{ label: 'Daily', value: 'daily' }, { label: 'Weekly', value: 'weekly' }]} />`,
    props: [
      { name: 'label', type: 'string', description: 'Fieldset legend for the choice group.' },
      { name: 'options', type: '{ label: string; value: string }[]', description: 'Available choices.' },
      { name: 'value', type: 'string', description: 'Selected option value.' },
      { name: 'onValueChange', type: '(value: string) => void', description: 'Called when another option is selected.' },
      { name: 'disabled', type: 'boolean', description: 'Disables the whole group.' },
    ],
  },
  {
    slug: 'select', name: 'Select', category: 'Forms',
    description: 'A native select field with the library’s hard-edged styling.',
    code: `<Select label="Category" value={category}\n  onValueChange={setCategory}\n  options={[{ label: 'Design', value: 'design' }]} />`,
    props: [
      { name: 'label', type: 'string', description: 'Visible label for the select.' },
      { name: 'options', type: '{ label: string; value: string }[]', description: 'Available choices.' },
      { name: 'value', type: 'string', description: 'Selected option value.' },
      { name: 'onValueChange', type: '(value: string) => void', description: 'Called when selection changes.' },
      { name: 'placeholder', type: 'string', description: 'Optional disabled prompt option.' },
    ],
  },
  {
    slug: 'card', name: 'Card', category: 'Content',
    description: 'A framed content surface with an optional eyebrow, description, and actions.',
    code: `<Card eyebrow="FIELD NOTE / 001" title="A stronger signal"\n  description="A clear action at every step.">\n  <Button size="sm">Explore</Button>\n</Card>`,
    props: [
      { name: 'title', type: 'string', description: 'Card heading.' },
      { name: 'eyebrow', type: 'string', description: 'Small label above the title.' },
      { name: 'description', type: 'string', description: 'Supporting copy.' },
      { name: 'children', type: 'ReactNode', description: 'Additional content or actions.' },
      { name: 'accent', type: 'AccentName', description: 'Overrides the active accent.' },
    ],
  },
  {
    slug: 'badge', name: 'Badge', category: 'Content',
    description: 'A short status label for compact metadata.',
    code: `<Badge tone="success">Live</Badge>`,
    props: [
      { name: 'tone', type: "'accent' | 'neutral' | 'success' | 'danger'", description: 'Color treatment. Default: accent.' },
      { name: 'accent', type: 'AccentName', description: 'Overrides the active accent for the accent tone.' },
      { name: 'children', type: 'string', description: 'Short label text.' },
    ],
  },
  {
    slug: 'empty-state', name: 'EmptyState', category: 'Content',
    description: 'A clear message and next action for a collection with no items.',
    code: `<EmptyState title="Nothing here yet"\n  description="Start your first collection.">\n  <Button size="sm">Create collection</Button>\n</EmptyState>`,
    props: [
      { name: 'title', type: 'string', description: 'Primary empty-state message.' },
      { name: 'description', type: 'string', description: 'Supporting explanation.' },
      { name: 'children', type: 'ReactNode', description: 'Optional action area.' },
      { name: 'accent', type: 'AccentName', description: 'Overrides the active accent.' },
    ],
  },
  {
    slug: 'avatar', name: 'Avatar', category: 'Content',
    description: 'An image or initials for a person, with three token-sized treatments.',
    code: `<Avatar name="Alex Morgan" size="md" />`,
    props: [
      { name: 'name', type: 'string', description: 'Accessible name and source for fallback initials.' },
      { name: 'src', type: 'string', description: 'Optional image URL; initials appear if it fails.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Avatar size. Default: md.' },
      { name: 'accent', type: 'AccentName', description: 'Overrides the fallback background accent.' },
    ],
  },
  {
    slug: 'separator', name: 'Separator', category: 'Content',
    description: 'A token-colored rule between content groups.',
    code: `<Separator />`,
    props: [
      { name: 'orientation', type: "'horizontal' | 'vertical'", description: 'Rule direction. Default: horizontal.' },
    ],
  },
  {
    slug: 'skeleton', name: 'Skeleton', category: 'Content',
    description: 'A static loading placeholder. Mark the loading region as busy for assistive technology.',
    code: `<div aria-busy="true"><Skeleton width="70%" /><Skeleton variant="block" /></div>`,
    props: [
      { name: 'variant', type: "'text' | 'block' | 'circle'", description: 'Placeholder shape. Default: text.' },
      { name: 'width', type: 'number | percentage', description: 'Optional width override.' },
      { name: 'height', type: 'number', description: 'Optional height override.' },
    ],
  },
  {
    slug: 'alert', name: 'Alert', category: 'Feedback',
    description: 'An inline message for information, success, warning, or danger.',
    code: `<Alert tone="warning" title="Check your details"\n  description="One field needs attention." />`,
    props: [
      { name: 'title', type: 'string', description: 'Main message.' },
      { name: 'description', type: 'string', description: 'Optional detail.' },
      { name: 'tone', type: "'info' | 'success' | 'warning' | 'danger'", description: 'Message severity. Default: info.' },
    ],
  },
  {
    slug: 'toast', name: 'Toast', category: 'Feedback',
    description: 'A dismissible status message for short-lived feedback.',
    code: `<Toast open={open} title="Collection saved"\n  description="Your changes are ready."\n  tone="success" onDismiss={() => setOpen(false)} />`,
    props: [
      { name: 'open', type: 'boolean', description: 'Whether the message is visible.' },
      { name: 'title', type: 'string', description: 'Main message.' },
      { name: 'description', type: 'string', description: 'Optional detail.' },
      { name: 'tone', type: "'info' | 'success' | 'warning' | 'danger'", description: 'Message severity. Default: info.' },
      { name: 'onDismiss', type: '() => void', description: 'Called when the close button is pressed.' },
    ],
  },
  {
    slug: 'progress-bar', name: 'ProgressBar', category: 'Feedback',
    description: 'A labelled progress indicator that clamps values to 0–100.',
    code: `<ProgressBar label="Collection complete" value={68} />`,
    props: [
      { name: 'value', type: 'number', description: 'Percentage from 0 to 100.' },
      { name: 'label', type: 'string', description: 'Accessible progress label. Default: Progress.' },
      { name: 'accent', type: 'AccentName', description: 'Overrides the active accent.' },
    ],
  },
  {
    slug: 'tabs', name: 'Tabs', category: 'Navigation',
    description: 'A controlled set of panels with arrow-key navigation.',
    code: `<Tabs label="Sections" value={tab} onValueChange={setTab}\n  tabs={[\n    { label: 'Overview', value: 'overview', content: <p>Overview</p> },\n    { label: 'Details', value: 'details', content: <p>Details</p> },\n  ]} />`,
    props: [
      { name: 'label', type: 'string', description: 'Accessible name for the tab list.' },
      { name: 'tabs', type: '{ label; value; content }[]', description: 'Tab labels and panel content.' },
      { name: 'value', type: 'string', description: 'Selected tab value.' },
      { name: 'onValueChange', type: '(value: string) => void', description: 'Called when selection changes.' },
      { name: 'accent', type: 'AccentName', description: 'Overrides the active accent.' },
    ],
  },
  {
    slug: 'accordion', name: 'Accordion', category: 'Navigation',
    description: 'Expandable content sections with one open item at a time.',
    code: `<Accordion value={openItem} onValueChange={setOpenItem}\n  items={[{ title: 'Materials', value: 'materials',\n    content: <p>Heavy borders and crisp type.</p> }]} />`,
    props: [
      { name: 'items', type: '{ title; value; content }[]', description: 'Disclosure headings and content.' },
      { name: 'value', type: 'string | null', description: 'Open item, or null when all are closed.' },
      { name: 'onValueChange', type: '(value: string | null) => void', description: 'Called when a heading is toggled.' },
      { name: 'accent', type: 'AccentName', description: 'Overrides the active accent.' },
    ],
  },
  {
    slug: 'dialog', name: 'Dialog', category: 'Navigation',
    description: 'A modal confirmation surface using the native dialog element.',
    code: `<Button onClick={() => setOpen(true)}>Open dialog</Button>\n<Dialog open={open} onOpenChange={setOpen}\n  title="Publish this collection?" description="Everyone can see it.">\n  <Button onClick={() => setOpen(false)}>Confirm</Button>\n</Dialog>`,
    props: [
      { name: 'open', type: 'boolean', description: 'Whether the modal is open.' },
      { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called on close or Escape.' },
      { name: 'title', type: 'string', description: 'Dialog heading.' },
      { name: 'description', type: 'string', description: 'Optional explanation.' },
      { name: 'children', type: 'ReactNode', description: 'Actions or additional content.' },
    ],
  },
  {
    slug: 'sidebar', name: 'Sidebar', category: 'Navigation',
    description: 'Grouped navigation with optional link icons, a collapsible desktop rail, and a controlled mobile drawer.',
    code: `<Sidebar collapsible currentPath="/projects"\n  mobileOpen={menuOpen} onMobileOpenChange={setMenuOpen}\n  groups={[{ title: 'Workspace', links: [\n    { label: 'Overview', href: '/overview', icon: '⌂' },\n    { label: 'Projects', href: '/projects', icon: '▦' },\n    { label: 'Settings', href: '/settings', icon: '⚙', iconPosition: 'right' },\n  ]}]} />`,
    props: [
      { name: 'groups', type: 'SidebarGroup[]', description: 'Titled sections with label, href, optional icon, and per-link iconPosition.' },
      { name: 'currentPath', type: 'string', description: 'Link href marked as the current page.' },
      { name: 'label', type: 'string', description: 'Accessible navigation label.' },
      { name: 'iconPosition', type: "'left' | 'right'", description: 'Default icon side for links. Each link may override it.' },
      { name: 'collapsible / collapsed', type: 'boolean', description: 'Enable the desktop toggle; optionally control its collapsed state.' },
      { name: 'defaultCollapsed / onCollapsedChange', type: 'boolean / callback', description: 'Initial uncontrolled state and change notification.' },
      { name: 'mobileOpen / onMobileOpenChange', type: 'boolean / callback', description: 'Opt into a controlled small-screen drawer with close and backdrop behavior.' },
      { name: 'header / footer', type: 'ReactNode', description: 'Optional content above and below the links.' },
      { name: 'onNavigate', type: 'callback', description: 'Web receives the click event and href, so custom routers can prevent default. React Native receives href.' },
    ],
  },
  {
    slug: 'chip', name: 'Chip', category: 'Content',
    description: 'A compact label that can be selected or removed.',
    code: `<Chip label="Design" selected={selected}\n  onClick={() => setSelected(!selected)}\n  onRemove={() => removeFilter('design')} />`,
    props: [
      { name: 'label', type: 'string', description: 'Visible chip text.' },
      { name: 'variant', type: "'filled' | 'outlined'", description: 'Appearance. Default: filled.' },
      { name: 'selected', type: 'boolean', description: 'Selected state for interactive chips.' },
      { name: 'onClick / onPress', type: 'callback', description: 'Selection action; native uses onPress.' },
      { name: 'onRemove', type: '() => void', description: 'Shows a separate accessible remove action.' },
      { name: 'disabled / accent', type: 'boolean / AccentName', description: 'Disables actions or overrides the accent.' },
    ],
  },
  {
    slug: 'breadcrumbs', name: 'Breadcrumbs', category: 'Navigation',
    description: 'A compact trail that shows the current location in a hierarchy.',
    code: `<Breadcrumbs items={[\n  { label: 'Home', href: '/' },\n  { label: 'Library', href: '/library' },\n  { label: 'Components' },\n]} />`,
    props: [
      { name: 'items', type: 'BreadcrumbItem[]', description: 'Ordered destinations; the final item is current.' },
      { name: 'label', type: 'string', description: 'Accessible trail label. Default: Breadcrumb.' },
      { name: 'onNavigate', type: '(href: string) => void', description: 'Required for interactive native links.' },
    ],
  },
  {
    slug: 'pagination', name: 'Pagination', category: 'Navigation',
    description: 'A controlled page selector with previous, next, and compact page links.',
    code: `<Pagination page={page} count={12} onPageChange={setPage} />`,
    props: [
      { name: 'page', type: 'number', description: 'Current 1-based page.' },
      { name: 'count', type: 'number', description: 'Total number of pages.' },
      { name: 'onPageChange', type: '(page: number) => void', description: 'Called when another page is selected.' },
      { name: 'label / accent', type: 'string / AccentName', description: 'Accessible label and accent override.' },
    ],
  },
  {
    slug: 'list', name: 'List', category: 'Content',
    description: 'A bordered list of records with optional leading and trailing content and controlled selection.',
    code: `<List items={[{ id: 'drafts', title: 'Drafts', description: 'Work in progress', leading: '◧' }]}\n  selectedId={selectedId} onItemSelect={setSelectedId} />`,
    props: [
      { name: 'items', type: 'ListItem[]', description: 'Items with id, title, optional description, leading/trailing content, and disabled state.' },
      { name: 'selectedId', type: 'string', description: 'Currently selected item id.' },
      { name: 'onItemSelect', type: '(id: string) => void', description: 'Makes each item an interactive action.' },
      { name: 'accent', type: 'AccentName', description: 'Overrides the selected item accent.' },
    ],
  },
  {
    slug: 'stepper', name: 'Stepper', category: 'Navigation',
    description: 'An ordered indicator for the current step in a multi-step flow.',
    code: `<Stepper steps={[{ label: 'Details' }, { label: 'Review' }, { label: 'Publish' }]} activeStep={1} />`,
    props: [
      { name: 'steps', type: 'StepperStep[]', description: 'Ordered labels with optional descriptions.' },
      { name: 'activeStep', type: 'number', description: 'Zero-based index of the current step.' },
      { name: 'orientation', type: "'horizontal' | 'vertical'", description: 'Layout direction. Default: horizontal.' },
      { name: 'accent', type: 'AccentName', description: 'Overrides the current step accent.' },
    ],
  },
  {
    slug: 'rating', name: 'Rating', category: 'Forms',
    description: 'A controlled star rating with keyboard arrow navigation on web.',
    code: `<Rating label="Rate this collection" value={rating} onValueChange={setRating} />`,
    props: [
      { name: 'label', type: 'string', description: 'Visible and accessible name.' },
      { name: 'value', type: 'number', description: 'Selected rating; zero shows no filled stars.' },
      { name: 'onValueChange', type: '(value: number) => void', description: 'Called when a star is selected.' },
      { name: 'max', type: 'number', description: 'Number of stars, clamped to 1–10. Default: 5.' },
      { name: 'disabled / accent', type: 'boolean / AccentName', description: 'Disables input or overrides the accent.' },
    ],
  },
  {
    slug: 'spinner', name: 'Spinner', category: 'Feedback',
    description: 'A compact status indicator for work in progress, with reduced-motion support on web.',
    code: `<Spinner label="Loading results" size="md" />`,
    props: [
      { name: 'label', type: 'string', description: 'Accessible loading message. Default: Loading.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Token-based indicator size. Default: md.' },
      { name: 'accent', type: 'AccentName', description: 'Overrides the active accent.' },
    ],
  },
  {
    slug: 'toggle-group', name: 'ToggleGroup', category: 'Forms',
    description: 'A compact controlled choice between mutually exclusive options.',
    code: `<ToggleGroup label="View" value={view} onValueChange={setView}\n  options={[{ label: 'Grid', value: 'grid' }, { label: 'List', value: 'list' }]} />`,
    props: [
      { name: 'label', type: 'string', description: 'Accessible name for the button group.' },
      { name: 'options', type: 'ToggleGroupOption[]', description: 'Choice labels and values; individual options may be disabled.' },
      { name: 'value', type: 'string', description: 'Currently selected option value.' },
      { name: 'onValueChange', type: '(value: string) => void', description: 'Called when another option is pressed.' },
      { name: 'disabled / accent', type: 'boolean / AccentName', description: 'Disables all choices or overrides the accent.' },
    ],
  },
  {
    slug: 'table', name: 'Table', category: 'Content',
    description: 'A horizontally scrollable, token-styled table for concise data.',
    code: `<Table caption="Recent issues" columns={[\n  { key: 'id', label: 'Issue' }, { key: 'status', label: 'Status' }\n]} rows={[{ id: 'one', cells: { id: 'INK-01', status: 'Open' } }]} />`,
    props: [
      { name: 'columns', type: 'TableColumn[]', description: 'Column keys, headers, and optional left/right alignment.' },
      { name: 'rows', type: 'TableRow[]', description: 'Rows with stable ids and string or number values keyed by column.' },
      { name: 'caption', type: 'string', description: 'Optional table description.' },
    ],
  },
  {
    slug: 'slider', name: 'Slider', category: 'Forms',
    description: 'A controlled numeric range input with token-styled track and thumb.',
    code: `<Slider label="Intensity" value={intensity} onValueChange={setIntensity} min={0} max={100} step={5} />`,
    props: [
      { name: 'label', type: 'string', description: 'Visible and accessible range label.' },
      { name: 'value / onValueChange', type: 'number / callback', description: 'Controlled value and change callback.' },
      { name: 'min / max / step', type: 'number', description: 'Range bounds and increment. Defaults: 0, 100, 1.' },
      { name: 'disabled / accent', type: 'boolean / AccentName', description: 'Disables input or overrides the accent.' },
    ],
  },
  {
    slug: 'dropdown-menu', name: 'DropdownMenu', category: 'Actions',
    description: 'A compact menu of actions with arrow-key navigation on web and a native modal on mobile.',
    code: `<DropdownMenu label="Actions" items={[{ id: 'edit', label: 'Edit' }, { id: 'delete', label: 'Delete', destructive: true }]} onItemSelect={handleAction} />`,
    props: [
      { name: 'label', type: 'string', description: 'Menu trigger label.' },
      { name: 'items', type: 'DropdownMenuItem[]', description: 'Action ids, labels, optional disabled or destructive flags.' },
      { name: 'onItemSelect', type: '(id: string) => void', description: 'Called when an action is chosen.' },
      { name: 'disabled / accent', type: 'boolean / AccentName', description: 'Disables the trigger or overrides its accent.' },
    ],
  },
  {
    slug: 'sheet', name: 'Sheet', category: 'Navigation',
    description: 'An edge-anchored modal panel for supplemental content.',
    code: `<Sheet open={open} onOpenChange={setOpen} title="Collection details" side="right"><p>Details here.</p></Sheet>`,
    props: [
      { name: 'open / onOpenChange', type: 'boolean / callback', description: 'Controlled visibility and close callback.' },
      { name: 'title / description', type: 'string', description: 'Accessible heading and optional supporting text.' },
      { name: 'side', type: "'left' | 'right' | 'top' | 'bottom'", description: 'Edge from which the sheet opens. Default: right.' },
      { name: 'children / accent', type: 'ReactNode / AccentName', description: 'Panel content and optional accent override.' },
    ],
  },
  {
    slug: 'tooltip', name: 'Tooltip', category: 'Feedback',
    description: 'A short hint on hover or focus that stays visible above scrolling containers; tapping opens a touch-friendly hint.',
    code: `<Tooltip label="Archive" content="Move this item to the archive.">?</Tooltip>`,
    props: [
      { name: 'label', type: 'string', description: 'Accessible trigger name.' },
      { name: 'content', type: 'string', description: 'Brief explanatory text.' },
      { name: 'children', type: 'string', description: 'Optional trigger text or symbol.' },
      { name: 'side', type: "'top' | 'bottom'", description: 'Web tooltip placement. Default: top.' },
    ],
  },
  {
    slug: 'combobox', name: 'Combobox', category: 'Forms',
    description: 'A searchable, controlled single-select list for larger option sets.',
    code: `<Combobox label="Category" options={categories} value={category} onValueChange={setCategory} />`,
    props: [
      { name: 'label', type: 'string', description: 'Visible and accessible field name.' },
      { name: 'options', type: 'ComboboxOption[]', description: 'Choice labels and values; options may be disabled.' },
      { name: 'value / onValueChange', type: 'string / callback', description: 'Controlled selection and change callback.' },
      { name: 'placeholder / emptyMessage', type: 'string', description: 'Search prompt and no-results message.' },
      { name: 'disabled / accent', type: 'boolean / AccentName', description: 'Disables the field or overrides the accent.' },
    ],
  },
];

export const componentGroups = (['Actions', 'Forms', 'Content', 'Feedback', 'Navigation'] as const).map(category => ({
  title: category,
  links: componentPages.filter(page => page.category === category).map(page => ({ label: page.name, href: `/components/${page.slug}` })),
}));
