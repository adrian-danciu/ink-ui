import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Accordion, Alert, Avatar, Badge, Breadcrumbs, Button, Card, Checkbox, Chip, Dialog, EmptyState, IconButton, Pagination, ProgressBar, RadioGroup, Select, Separator, SideNav, Skeleton, Switch, Tabs, TextArea, TextField, ThemeProvider, Toast, type ThemeName } from '@adrian-danciu/ink-ui';
import { accents, themes, type AccentName, type ThemeMode } from '@adrian-danciu/ink-ui-tokens';
import '@adrian-danciu/ink-ui/styles.css';
import './preview.css';

const themeInfo: { id: ThemeName; number: string; title: string; description: string }[] = [
  { id: 'poster', number: '01', title: 'Poster', description: 'Raw editorial contrast and restrained signal color.' },
  { id: 'paper', number: '02', title: 'Paper', description: 'Old paper, black ink, multiple color hits.' },
  { id: 'electric', number: '03', title: 'Electric', description: 'Graphite, ultraviolet, electric lime.' },
];

const accentNames = Object.keys(accents) as AccentName[];

function ThemePanel({ id, number, title, description, mode, selectedAccent }: (typeof themeInfo)[number] & { mode: ThemeMode; selectedAccent: AccentName | 'default' }) {
  const [clicks, setClicks] = React.useState(0);
  const [checked, setChecked] = React.useState(false);
  const [switchChecked, setSwitchChecked] = React.useState(true);
  const [radioValue, setRadioValue] = React.useState('daily');
  const [progress, setProgress] = React.useState(68);
  const [query, setQuery] = React.useState('');
  const [note, setNote] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('overview');
  const [openItem, setOpenItem] = React.useState<string | null>('materials');
  const [category, setCategory] = React.useState('design');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(true);
  const [favorites, setFavorites] = React.useState(0);
  const [chipSelected, setChipSelected] = React.useState(false);
  const [page, setPage] = React.useState(4);
  const colors = themes[id].modes[mode];
  const accent = selectedAccent === 'default' ? themes[id].defaultAccent as AccentName : selectedAccent;
  const swatches = [
    ['canvas', colors.canvas], ['surface', colors.surface], ['accent', accents[accent].base],
    ['highlight', colors.highlight], ['highlight-alt', colors.highlightAlt], ['highlight-third', colors.highlightThird],
  ];

  return (
    <ThemeProvider theme={id} mode={mode} accent={accent} className="theme-panel">
      <div className="panel-topline"><span>STYLE {number}</span><span>{mode.toUpperCase()} MODE</span></div>
      <header className="panel-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      <div className="panel-rule" />
      <section aria-label={`${title} button samples`}>
        <div className="section-heading"><span>BUTTONS</span><span>COMPONENT 01</span></div>
        <div className="sample-group">
          <span className="sample-label">PRIMARY</span>
          <div className="button-row">
            <Button size="sm" onClick={() => setClicks(value => value + 1)}>Small</Button>
            <Button onClick={() => setClicks(value => value + 1)}>Medium</Button>
            <Button size="lg" onClick={() => setClicks(value => value + 1)}>Large</Button>
          </div>
        </div>
        <div className="sample-group">
          <span className="sample-label">SECONDARY</span>
          <div className="button-row">
            <Button size="sm" variant="secondary" onClick={() => setClicks(value => value + 1)}>Small</Button>
            <Button variant="secondary" onClick={() => setClicks(value => value + 1)}>Medium</Button>
            <Button size="lg" variant="secondary" onClick={() => setClicks(value => value + 1)}>Large</Button>
          </div>
        </div>
        <div className="sample-group">
          <span className="sample-label">DISABLED / INTERACTION</span>
          <div className="button-row">
            <Button disabled>Disabled</Button>
            <span className="click-readout">PRESSED {String(clicks).padStart(2, '0')} TIMES</span>
          </div>
        </div>
        <div className="sample-group">
          <span className="sample-label">PER-BUTTON ACCENT OVERRIDE</span>
          <div className="button-row accent-row">
            {accentNames.map(name => <Button key={name} size="sm" accent={name} onClick={() => setClicks(value => value + 1)}>{name}</Button>)}
          </div>
        </div>
      </section>
      <div className="panel-rule" />
      <section aria-label={`${title} basic components`}>
        <div className="section-heading"><span>FOUNDATIONS</span><span>02—05</span></div>
        <div className="component-block">
          <span className="sample-label">TEXT FIELDS</span>
          <div className="field-stack">
            <TextField label="Search the archive" placeholder="Type a keyword..." value={query} onChange={event => setQuery(event.currentTarget.value)} helperText="Try a title, tag, or creator." />
            <TextField label="Reference code" placeholder="ABC-123" errorText="That code was not found." />
          </div>
        </div>
        <div className="component-block">
          <span className="sample-label">BADGES</span>
          <div className="badge-row"><Badge>Featured</Badge><Badge tone="neutral">Draft</Badge><Badge tone="success">Live</Badge><Badge tone="danger">Error</Badge></div>
        </div>
        <div className="component-block">
          <span className="sample-label">CHECKBOXES</span>
          <div className="checkbox-row"><Checkbox label="Add to collection" checked={checked} onCheckedChange={setChecked} /><Checkbox label="Unavailable" checked disabled onCheckedChange={() => {}} /></div>
        </div>
        <div className="component-block">
          <span className="sample-label">CARD</span>
          <Card eyebrow="FIELD NOTE / 001" title="A stronger signal" description="Bold surfaces, direct labels, and a clear action at every step." accent={accent}>
            <div className="card-actions"><Badge tone="neutral">In review</Badge><Button size="sm">Explore</Button></div>
          </Card>
        </div>
      </section>
      <div className="panel-rule" />
      <section aria-label={`${title} controls and feedback`}>
        <div className="section-heading"><span>CONTROLS + FEEDBACK</span><span>06—09</span></div>
        <div className="component-block">
          <span className="sample-label">SWITCH</span>
          <Switch label="Live updates" checked={switchChecked} onCheckedChange={setSwitchChecked} />
        </div>
        <div className="component-block">
          <span className="sample-label">RADIO GROUP</span>
          <RadioGroup label="Dispatch frequency" options={[{ label: 'Daily', value: 'daily' }, { label: 'Weekly', value: 'weekly' }]} value={radioValue} onValueChange={setRadioValue} />
        </div>
        <div className="component-block">
          <span className="sample-label">ALERTS</span>
          <div className="feedback-stack">
            <Alert tone="info" title="Filed successfully" description="Your draft is ready for review." />
            <Alert tone="warning" title="Check your details" description="One field still needs attention." />
          </div>
        </div>
        <div className="component-block">
          <span className="sample-label">PROGRESS BAR</span>
          <ProgressBar label="Collection complete" value={progress} />
          <input className="progress-input" type="range" min="0" max="100" value={progress} aria-label={`${title} progress sample value`} onChange={event => setProgress(Number(event.currentTarget.value))} />
        </div>
      </section>
      <div className="panel-rule" />
      <section aria-label={`${title} content components`}>
        <div className="section-heading"><span>CONTENT + NAVIGATION</span><span>10—20</span></div>
        <div className="component-block">
          <span className="sample-label">TEXT AREA</span>
          <TextArea label="Field notes" placeholder="Leave an observation..." value={note} onChange={event => setNote(event.currentTarget.value)} helperText="Keep it concise and useful." />
        </div>
        <div className="component-block">
          <span className="sample-label">TABS</span>
          <Tabs label="Collection sections" tabs={[{ label: 'Overview', value: 'overview', content: <p>01 / A sharp summary of the collection.</p> }, { label: 'Details', value: 'details', content: <p>02 / Materials, notes, and related work.</p> }]} value={activeTab} onValueChange={setActiveTab} />
        </div>
        <div className="component-block">
          <span className="sample-label">ACCORDION</span>
          <Accordion items={[{ title: 'Materials', value: 'materials', content: <p>Heavy borders. Flat colors. Crisp type.</p> }, { title: 'Usage', value: 'usage', content: <p>Use the same tokens across every surface.</p> }]} value={openItem} onValueChange={setOpenItem} />
        </div>
        <div className="component-block">
          <span className="sample-label">EMPTY STATE</span>
          <EmptyState title="Nothing here yet" description="Your next collection starts with one item."><Button size="sm">Create collection</Button></EmptyState>
        </div>
        <div className="component-block">
          <span className="sample-label">AVATAR / SEPARATOR / SKELETON</span>
          <div className="button-row"><Avatar name="Alex Morgan" size="sm" /><Avatar name="Alex Morgan" /><Avatar name="Alex Morgan" size="lg" accent="turquoise" /></div>
          <Separator />
          <div className="field-stack" aria-busy="true"><Skeleton width="65%" /><Skeleton variant="block" /></div>
        </div>
        <div className="component-block">
          <span className="sample-label">CHIP</span>
          <div className="button-row"><Chip label="Design" selected={chipSelected} onClick={() => setChipSelected(value => !value)} /><Chip label="Editorial" variant="outlined" onRemove={() => setChipSelected(false)} /></div>
        </div>
        <div className="component-block">
          <span className="sample-label">BREADCRUMBS / PAGINATION</span>
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Library', href: '/components' }, { label: title }]} />
          <Pagination page={page} count={12} onPageChange={setPage} accent={accent} />
        </div>
        <div className="component-block">
          <span className="sample-label">SIDE NAV</span>
          <SideNav currentPath="/library" groups={[{ title: 'Workspace', links: [{ label: 'Overview', href: '/' }, { label: 'Library', href: '/library' }, { label: 'Settings', href: '/settings' }] }]} />
        </div>
      </section>
      <div className="panel-rule" />
      <section aria-label={`${title} actions and overlays`}>
        <div className="section-heading"><span>ACTIONS + OVERLAYS</span><span>21—24</span></div>
        <div className="component-block">
          <span className="sample-label">SELECT</span>
          <Select label="Collection category" options={[{ label: 'Design', value: 'design' }, { label: 'Photography', value: 'photo' }, { label: 'Writing', value: 'writing' }]} value={category} onValueChange={setCategory} />
        </div>
        <div className="component-block">
          <span className="sample-label">ICON BUTTONS</span>
          <div className="button-row"><IconButton label="Add favorite" icon="★" variant="primary" onClick={() => setFavorites(value => value + 1)} /><IconButton label="Search" icon="⌕" onClick={() => setFavorites(value => value + 1)} /><span className="click-readout">PRESSED {String(favorites).padStart(2, '0')} TIMES</span></div>
        </div>
        <div className="component-block">
          <span className="sample-label">DIALOG</span>
          <Button size="sm" onClick={() => setDialogOpen(true)}>Open dialog</Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen} title="Publish this collection?" description="This will make the collection visible to everyone." accent={accent}>
            <div className="dialog-actions"><Button variant="secondary" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={() => { setDialogOpen(false); setToastOpen(true); }}>Publish</Button></div>
          </Dialog>
        </div>
        <div className="component-block">
          <span className="sample-label">TOAST</span>
          {toastOpen ? <Toast open title="Collection saved" description="Your changes are ready." tone="success" onDismiss={() => setToastOpen(false)} /> : <Button size="sm" variant="secondary" onClick={() => setToastOpen(true)}>Show toast</Button>}
        </div>
      </section>
      <div className="panel-rule" />
      <section aria-label={`${title} palette`}>
        <div className="section-heading"><span>PALETTE</span><span>06 TOKENS</span></div>
        <div className="swatches">
          {swatches.map(([key, value]) => <div className="swatch" key={key} title={`${key}: ${value}`}>
            <span style={{ backgroundColor: value }} />
            <small>{key}</small>
          </div>)}
        </div>
      </section>
      <footer className="panel-footer"><span>HARD LINES. CLEAR ACTIONS.</span><span>✳</span></footer>
    </ThemeProvider>
  );
}

function App() {
  const [selectedTheme, setSelectedTheme] = React.useState<ThemeName>(() => {
    const requestedTheme = new URLSearchParams(window.location.search).get('theme');
    return themeInfo.find(theme => theme.id === requestedTheme)?.id ?? 'poster';
  });
  const [mode, setMode] = React.useState<ThemeMode>('light');
  const [selectedAccent, setSelectedAccent] = React.useState<AccentName | 'default'>('default');
  const activeTheme = themeInfo.find(theme => theme.id === selectedTheme)!;

  function selectTheme(theme: ThemeName) {
    setSelectedTheme(theme);
    const url = new URL(window.location.href);
    url.searchParams.set('theme', theme);
    window.history.replaceState(null, '', url);
  }

  function handleThemeKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const currentIndex = themeInfo.findIndex(theme => theme.id === selectedTheme);
    let nextIndex: number;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % themeInfo.length;
    else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + themeInfo.length) % themeInfo.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = themeInfo.length - 1;
    else return;

    event.preventDefault();
    const nextTheme = themeInfo[nextIndex].id;
    selectTheme(nextTheme);
    document.getElementById(`theme-tab-${nextTheme}`)?.focus();
  }

  return <main className="preview-page">
    <div className="page-kicker"><span>INK UI / COMPONENT EXPERIMENT</span><span>WEB PREVIEW / SHARED SYSTEM</span></div>
    <h1>COMPONENT<br /><em>LAB.</em></h1>
    <div className="page-intro"><p>Three styles. Two modes. Your accent.</p><span>Try the controls and use Tab to inspect focus states.</span></div>
    <div className="theme-selector" role="tablist" aria-label="Preview style" onKeyDown={handleThemeKeyDown}>
      {themeInfo.map(theme => <button
        key={theme.id}
        id={`theme-tab-${theme.id}`}
        className="theme-choice"
        type="button"
        role="tab"
        aria-selected={selectedTheme === theme.id}
        aria-controls="theme-preview"
        tabIndex={selectedTheme === theme.id ? 0 : -1}
        onClick={() => selectTheme(theme.id)}
      ><span>{theme.number} /</span> {theme.title}</button>)}
    </div>
    <div className="preview-controls">
      <fieldset className="control-group"><legend>MODE</legend>
        {(['light', 'dark'] as const).map(value => <button key={value} className="control-choice" aria-pressed={mode === value} onClick={() => setMode(value)}>{value}</button>)}
      </fieldset>
      <fieldset className="control-group accent-controls"><legend>DEFAULT ACCENT</legend>
        <button className="control-choice" aria-pressed={selectedAccent === 'default'} onClick={() => setSelectedAccent('default')}>Style default</button>
        {accentNames.map(name => <button key={name} className="control-choice accent-choice" aria-pressed={selectedAccent === name} onClick={() => setSelectedAccent(name)}><span style={{ backgroundColor: accents[name].base }} />{name}</button>)}
      </fieldset>
    </div>
    <div className="theme-stage" id="theme-preview" role="tabpanel" aria-labelledby={`theme-tab-${selectedTheme}`} tabIndex={0}>
      <ThemePanel key={selectedTheme} {...activeTheme} mode={mode} selectedAccent={selectedAccent} />
    </div>
    <p className="page-note">PROVISIONAL COLORS — BASED ON THE REFERENCE IMAGES</p>
  </main>;
}

createRoot(document.getElementById('root')!).render(<App />);
