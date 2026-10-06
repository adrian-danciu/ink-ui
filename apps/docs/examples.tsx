import * as React from 'react';
import { Accordion, Alert, Avatar, Badge, Breadcrumbs, Button, Card, Checkbox, Chip, Dialog, EmptyState, IconButton, List, Pagination, ProgressBar, RadioGroup, Rating, Select, Separator, Sidebar, Skeleton, Spinner, Stepper, Switch, Table, Tabs, TextArea, TextField, Toast, ToggleGroup } from '@adrian-danciu/ink-ui';

export function ComponentExample({ slug }: { slug: string }) {
  const [count, setCount] = React.useState(0);
  const [checked, setChecked] = React.useState(false);
  const [enabled, setEnabled] = React.useState(true);
  const [choice, setChoice] = React.useState('daily');
  const [category, setCategory] = React.useState('design');
  const [query, setQuery] = React.useState('');
  const [note, setNote] = React.useState('');
  const [progress, setProgress] = React.useState(68);
  const [tab, setTab] = React.useState('overview');
  const [openItem, setOpenItem] = React.useState<string | null>('materials');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(true);
  const [chipSelected, setChipSelected] = React.useState(false);
  const [chipVisible, setChipVisible] = React.useState(true);
  const [page, setPage] = React.useState(4);
  const [demoSidebarOpen, setDemoSidebarOpen] = React.useState(false);
  const [selectedListItem, setSelectedListItem] = React.useState('drafts');
  const [activeStep, setActiveStep] = React.useState(1);
  const [rating, setRating] = React.useState(3);
  const [view, setView] = React.useState('grid');

  switch (slug) {
    case 'button': return <div className="demo-stack">
      <div className="demo-row"><Button size="sm" onClick={() => setCount(count + 1)}>Small</Button><Button onClick={() => setCount(count + 1)}>Medium</Button><Button size="lg" onClick={() => setCount(count + 1)}>Large</Button></div>
      <div className="demo-row"><Button variant="secondary" onClick={() => setCount(count + 1)}>Secondary</Button><Button disabled>Disabled</Button></div>
      <small>Pressed {count} times</small>
    </div>;
    case 'icon-button': return <div className="demo-row"><IconButton label="Add favorite" icon="★" variant="primary" onClick={() => setCount(count + 1)} /><IconButton label="Search" icon="⌕" onClick={() => setCount(count + 1)} /><small>Pressed {count} times</small></div>;
    case 'text-field': return <div className="demo-field"><TextField label="Search the archive" placeholder="Type a keyword..." value={query} onChange={event => setQuery(event.currentTarget.value)} helperText="Try a title, tag, or creator." /></div>;
    case 'text-area': return <div className="demo-field"><TextArea label="Field notes" placeholder="Leave an observation..." value={note} onChange={event => setNote(event.currentTarget.value)} helperText="Keep it concise and useful." /></div>;
    case 'checkbox': return <div className="demo-stack"><Checkbox label="Add to collection" checked={checked} onCheckedChange={setChecked} /><Checkbox label="Unavailable" checked disabled onCheckedChange={() => {}} /></div>;
    case 'switch': return <Switch label="Live updates" checked={enabled} onCheckedChange={setEnabled} />;
    case 'radio-group': return <RadioGroup label="Dispatch frequency" options={[{ label: 'Daily', value: 'daily' }, { label: 'Weekly', value: 'weekly' }]} value={choice} onValueChange={setChoice} />;
    case 'select': return <div className="demo-field"><Select label="Collection category" options={[{ label: 'Design', value: 'design' }, { label: 'Photography', value: 'photo' }, { label: 'Writing', value: 'writing' }]} value={category} onValueChange={setCategory} /></div>;
    case 'card': return <div className="demo-card"><Card eyebrow="FIELD NOTE / 001" title="A stronger signal" description="Bold surfaces, direct labels, and a clear action at every step."><Button size="sm">Explore</Button></Card></div>;
    case 'badge': return <div className="demo-row"><Badge>Featured</Badge><Badge tone="neutral">Draft</Badge><Badge tone="success">Live</Badge><Badge tone="danger">Error</Badge></div>;
    case 'avatar': return <div className="demo-row"><Avatar name="Alex Morgan" size="sm" /><Avatar name="Alex Morgan" /><Avatar name="Alex Morgan" size="lg" accent="turquoise" /></div>;
    case 'separator': return <div className="demo-stack demo-field"><span>Above the rule</span><Separator /><span>Below the rule</span></div>;
    case 'skeleton': return <div className="demo-stack demo-field" aria-busy="true"><div className="demo-row"><Skeleton variant="circle" /><Skeleton width="65%" /></div><Skeleton variant="block" /></div>;
    case 'empty-state': return <div className="demo-card"><EmptyState title="Nothing here yet" description="Your next collection starts with one item."><Button size="sm">Create collection</Button></EmptyState></div>;
    case 'alert': return <div className="demo-stack demo-field"><Alert tone="info" title="Filed successfully" description="Your draft is ready for review." /><Alert tone="warning" title="Check your details" description="One field still needs attention." /></div>;
    case 'toast': return <div className="demo-field">{toastOpen ? <Toast open title="Collection saved" description="Your changes are ready." tone="success" onDismiss={() => setToastOpen(false)} /> : <Button size="sm" onClick={() => setToastOpen(true)}>Show toast</Button>}</div>;
    case 'progress-bar': return <div className="demo-field"><ProgressBar label="Collection complete" value={progress} /><input type="range" min="0" max="100" value={progress} aria-label="Preview progress" onChange={event => setProgress(Number(event.currentTarget.value))} /></div>;
    case 'tabs': return <div className="demo-field"><Tabs label="Collection sections" value={tab} onValueChange={setTab} tabs={[{ label: 'Overview', value: 'overview', content: <p>A sharp summary of the collection.</p> }, { label: 'Details', value: 'details', content: <p>Materials, notes, and related work.</p> }]} /></div>;
    case 'accordion': return <div className="demo-field"><Accordion items={[{ title: 'Materials', value: 'materials', content: <p>Heavy borders. Flat colors. Crisp type.</p> }, { title: 'Usage', value: 'usage', content: <p>Use the same tokens across every surface.</p> }]} value={openItem} onValueChange={setOpenItem} /></div>;
    case 'dialog': return <><Button onClick={() => setDialogOpen(true)}>Open dialog</Button><Dialog open={dialogOpen} onOpenChange={setDialogOpen} title="Publish this collection?" description="This will make the collection visible to everyone."><div className="demo-row"><Button variant="secondary" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={() => setDialogOpen(false)}>Publish</Button></div></Dialog></>;
    case 'sidebar': return <div className="demo-sidebar">
      <button className="demo-mobile-sidebar-trigger" type="button" onClick={() => setDemoSidebarOpen(true)}>Open sample sidebar</button>
      <Sidebar collapsible currentPath="/demo/overview" mobileOpen={demoSidebarOpen} onMobileOpenChange={setDemoSidebarOpen} onNavigate={event => event.preventDefault()} groups={[
        { title: 'Workspace', links: [{ label: 'Overview', href: '/demo/overview', icon: '⌂' }, { label: 'Projects', href: '/demo/projects', icon: '▦' }, { label: 'Activity', href: '/demo/activity', icon: '◷' }, { label: 'Saved items', href: '/demo/saved', icon: '★', iconPosition: 'right' }] },
        { title: 'Account', links: [{ label: 'Messages', href: '/demo/messages', icon: '✉' }, { label: 'Team', href: '/demo/team', icon: '♧' }, { label: 'Settings', href: '/demo/settings', icon: '⚙', iconPosition: 'right' }, { label: 'Help', href: '/demo/help' }] },
      ]} />
    </div>;
    case 'chip': return <div className="demo-row">{chipVisible && <Chip label="Design" selected={chipSelected} onClick={() => setChipSelected(value => !value)} onRemove={() => setChipVisible(false)} />}<Chip label="Editorial" variant="outlined" /><Chip label="Unavailable" disabled onClick={() => {}} /></div>;
    case 'breadcrumbs': return <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Components', href: '/components' }, { label: 'Breadcrumbs' }]} />;
    case 'pagination': return <Pagination page={page} count={12} onPageChange={setPage} />;
    case 'list': return <div className="demo-field"><List selectedId={selectedListItem} onItemSelect={setSelectedListItem} items={[{ id: 'drafts', title: 'Drafts', description: 'Work in progress', leading: '◧', trailing: '04' }, { id: 'published', title: 'Published', description: 'Available to everyone', leading: '◆', trailing: '12' }, { id: 'archive', title: 'Archive', description: 'Earlier work', leading: '▤', trailing: '08' }]} /></div>;
    case 'stepper': return <div className="demo-stack demo-field"><Stepper steps={[{ label: 'Details', description: 'Write the basics' }, { label: 'Review', description: 'Check everything' }, { label: 'Publish', description: 'Go live' }]} activeStep={activeStep} /><div className="demo-row"><Button size="sm" variant="secondary" disabled={activeStep === 0} onClick={() => setActiveStep(activeStep - 1)}>Previous</Button><Button size="sm" disabled={activeStep === 2} onClick={() => setActiveStep(activeStep + 1)}>Next</Button></div></div>;
    case 'rating': return <Rating label="Rate this collection" value={rating} onValueChange={setRating} />;
    case 'spinner': return <div className="demo-row"><Spinner size="sm" label="Loading small item" /><Spinner label="Loading results" /><Spinner size="lg" label="Loading large item" /></div>;
    case 'toggle-group': return <ToggleGroup label="Collection view" options={[{ label: 'Grid', value: 'grid' }, { label: 'List', value: 'list' }, { label: 'Timeline', value: 'timeline' }]} value={view} onValueChange={setView} />;
    case 'table': return <Table caption="Recent issues" columns={[{ key: 'id', label: 'Issue' }, { key: 'status', label: 'Status' }, { key: 'owner', label: 'Owner' }]} rows={[{ id: 'one', cells: { id: 'INK-01', status: 'Open', owner: 'Alex' } }, { id: 'two', cells: { id: 'INK-02', status: 'In review', owner: 'Sam' } }, { id: 'three', cells: { id: 'INK-03', status: 'Done', owner: 'Lee' } }]} />;
    default: return null;
  }
}
