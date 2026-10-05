import * as React from 'react';
import { Accordion, Alert, Badge, Button, Card, Checkbox, Dialog, EmptyState, IconButton, ProgressBar, RadioGroup, Select, Sidebar, Switch, Tabs, TextArea, TextField, Toast } from '@ui-library/react';

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
    case 'empty-state': return <div className="demo-card"><EmptyState title="Nothing here yet" description="Your next collection starts with one item."><Button size="sm">Create collection</Button></EmptyState></div>;
    case 'alert': return <div className="demo-stack demo-field"><Alert tone="info" title="Filed successfully" description="Your draft is ready for review." /><Alert tone="warning" title="Check your details" description="One field still needs attention." /></div>;
    case 'toast': return <div className="demo-field">{toastOpen ? <Toast open title="Collection saved" description="Your changes are ready." tone="success" onDismiss={() => setToastOpen(false)} /> : <Button size="sm" onClick={() => setToastOpen(true)}>Show toast</Button>}</div>;
    case 'progress-bar': return <div className="demo-field"><ProgressBar label="Collection complete" value={progress} /><input type="range" min="0" max="100" value={progress} aria-label="Preview progress" onChange={event => setProgress(Number(event.currentTarget.value))} /></div>;
    case 'tabs': return <div className="demo-field"><Tabs label="Collection sections" value={tab} onValueChange={setTab} tabs={[{ label: 'Overview', value: 'overview', content: <p>A sharp summary of the collection.</p> }, { label: 'Details', value: 'details', content: <p>Materials, notes, and related work.</p> }]} /></div>;
    case 'accordion': return <div className="demo-field"><Accordion items={[{ title: 'Materials', value: 'materials', content: <p>Heavy borders. Flat colors. Crisp type.</p> }, { title: 'Usage', value: 'usage', content: <p>Use the same tokens across every surface.</p> }]} value={openItem} onValueChange={setOpenItem} /></div>;
    case 'dialog': return <><Button onClick={() => setDialogOpen(true)}>Open dialog</Button><Dialog open={dialogOpen} onOpenChange={setDialogOpen} title="Publish this collection?" description="This will make the collection visible to everyone."><div className="demo-row"><Button variant="secondary" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={() => setDialogOpen(false)}>Publish</Button></div></Dialog></>;
    case 'sidebar': return <div className="demo-sidebar"><Sidebar currentPath="/components/sidebar" groups={[{ title: 'Foundations', links: [{ label: 'Getting started', href: '/getting-started' }, { label: 'Themes', href: '/themes' }] }, { title: 'Navigation', links: [{ label: 'Sidebar', href: '/components/sidebar' }, { label: 'Tabs', href: '/components/tabs' }] }]} /></div>;
    default: return null;
  }
}
