import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Select, Sidebar, ThemeProvider, type ThemeMode, type ThemeName } from '@adrian-danciu/ink-ui';
import { accents, themes, type AccentName } from '@adrian-danciu/ink-ui-tokens';
import { ComponentExample } from './examples';
import { logoDataUrl } from './logo';
import { componentGroups, componentPages, type ComponentPage } from './pages';
import '@adrian-danciu/ink-ui/styles.css';
import './docs.css';

const navigation = [
  { title: 'Start here', links: [{ label: 'Overview', href: '/' }, { label: 'Getting started', href: '/getting-started' }, { label: 'Themes & tokens', href: '/themes' }, { label: 'All components', href: '/components' }] },
  ...componentGroups,
];

const themeOptions = [
  { label: 'Paper', value: 'paper' },
  { label: 'Poster', value: 'poster' },
  { label: 'Electric', value: 'electric' },
];

const accentOptions = [
  { label: 'Style default', value: 'default' },
  ...Object.keys(accents).map(name => ({ label: name.charAt(0).toUpperCase() + name.slice(1), value: name })),
];

function readTheme(): ThemeName {
  const value = window.sessionStorage.getItem('ink-ui-docs-theme');
  return value === 'poster' || value === 'paper' || value === 'electric' ? value : 'paper';
}

function readMode(): ThemeMode {
  return window.sessionStorage.getItem('ink-ui-docs-mode') === 'dark' ? 'dark' : 'light';
}

function readAccent(): AccentName | 'default' {
  const value = window.sessionStorage.getItem('ink-ui-docs-accent');
  return value && Object.hasOwn(accents, value) ? value as AccentName : 'default';
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);
  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }
  return <div className="docs-code">
    <div className="docs-code-head"><span>TSX / EXAMPLE</span><button type="button" onClick={copy}>{copied ? 'COPIED' : 'COPY'}</button></div>
    <pre><code>{code}</code></pre>
  </div>;
}

function PageHeader({ index, category, title, description }: { index: string; category: string; title: string; description: string }) {
  return <header className="docs-page-header">
    <div className="docs-eyebrow"><span>{category.toUpperCase()}</span><span>ISSUE {index}</span></div>
    <h1>{title}</h1>
    <p>{description}</p>
  </header>;
}

function ComponentDoc({ page, theme, mode }: { page: ComponentPage; theme: ThemeName; mode: ThemeMode }) {
  const index = String(componentPages.indexOf(page) + 1).padStart(2, '0');
  const next = componentPages[componentPages.indexOf(page) + 1];
  return <>
    <PageHeader index={index} category={page.category} title={page.name} description={page.description} />
    <section className="docs-section" aria-labelledby="example-heading">
      <div className="docs-section-heading"><h2 id="example-heading">Live example</h2><span>INTERACTIVE / {theme.toUpperCase()} / {mode.toUpperCase()}</span></div>
      <div className="docs-demo"><ComponentExample key={page.slug} slug={page.slug} /></div>
      <p className="docs-caption">The example uses the selected style, mode, and accent. Change them above to compare the same component across the system.</p>
      {page.slug === 'sidebar' && <p className="docs-caption">These sidebar links are sample destinations and do not navigate away from the documentation.</p>}
    </section>
    <section className="docs-section" aria-labelledby="usage-heading">
      <div className="docs-section-heading"><h2 id="usage-heading">Usage</h2><span>REACT / NEXT.JS</span></div>
      <CodeBlock code={page.code} />
    </section>
    <section className="docs-section" aria-labelledby="props-heading">
      <div className="docs-section-heading"><h2 id="props-heading">Props</h2><span>PUBLIC API</span></div>
      <div className="docs-table-wrap"><table className="docs-table"><thead><tr><th>Prop</th><th>Type</th><th>Purpose</th></tr></thead><tbody>
        {page.props.map(prop => <tr key={prop.name}><th scope="row">{prop.name}</th><td><code>{prop.type}</code></td><td>{prop.description}</td></tr>)}
      </tbody></table></div>
      <p className="docs-caption">See the TypeScript export for the complete type. DOM-based components also accept their corresponding native HTML props where their interface extends them.</p>
    </section>
    <p className="docs-platform-note">Also available from <code>@adrian-danciu/ink-ui-native</code> with the same component name. Platform event props follow React Native conventions.</p>
    {next && <a className="docs-next" href={`/components/${next.slug}`}><span>NEXT COMPONENT</span><strong>{next.name} ↗</strong></a>}
  </>;
}

function Overview() {
  return <>
    <PageHeader index="00" category="The system" title="Ink UI" description="A bold, token-driven component library for React, Next.js, and React Native. Hard edges, clear actions, and three visual styles." />
    <div className="docs-callout"><span>01 / THE IDEA</span><strong>Built like a poster. Read like a paper. Used like a system.</strong><p>Poster, Paper, and Electric share one component vocabulary. Every style has light and dark modes, with accents you can change per provider or per component.</p></div>
    <div className="docs-feature-grid">
      <a href="/getting-started"><span>START / 01</span><h2>Get set up</h2><p>Workspace setup, imports, and your first component.</p><b>READ GUIDE ↗</b></a>
      <a href="/themes"><span>SYSTEM / 02</span><h2>Explore themes</h2><p>Three styles, two modes, shared tokens, and accent overrides.</p><b>VIEW TOKENS ↗</b></a>
      <a href="/components"><span>INDEX / 03</span><h2>Browse components</h2><p>Live examples and API details for every available web component.</p><b>OPEN INDEX ↗</b></a>
    </div>
    <section className="docs-section"><div className="docs-section-heading"><h2>Component preview</h2><span>CORE COLLECTION</span></div><p className="docs-body-copy">The separate preview app shows the component collection in one selected style. Open it at <a href="http://localhost:3000/?theme=poster">localhost:3000</a> when the preview server is running.</p></section>
  </>;
}

function GettingStarted() {
  return <>
    <PageHeader index="01" category="Guide" title="Getting started" description="Start with the Bun workspace, then import the stylesheet and components into your React app." />
    <section className="docs-section"><div className="docs-section-heading"><h2>Run locally</h2><span>WORKSPACE</span></div><CodeBlock code={'bun install\nbun run docs'} /><p className="docs-body-copy">The docs server runs on port 3001. The component preview runs separately with <code>bun run dev</code> on port 3000.</p></section>
    <section className="docs-section"><div className="docs-section-heading"><h2>React / Next.js</h2><span>WEB</span></div><CodeBlock code={`import '@adrian-danciu/ink-ui/styles.css';\nimport { Button, ThemeProvider } from '@adrian-danciu/ink-ui';\n\n<ThemeProvider theme="paper" mode="light" accent="red">\n  <Button>Continue</Button>\n</ThemeProvider>`} /><p className="docs-body-copy">Import the stylesheet once at the app root. In Next.js, put it in your root layout. Wrap the part of the app you want themed with <code>ThemeProvider</code>.</p></section>
    <section className="docs-section"><div className="docs-section-heading"><h2>React Native</h2><span>MOBILE</span></div><CodeBlock code={`import { Button, ThemeProvider } from '@adrian-danciu/ink-ui-native';\n\n<ThemeProvider theme="electric" mode="dark" accent="lime">\n  <Button onPress={() => {}}>Continue</Button>\n</ThemeProvider>`} /><p className="docs-body-copy">Native components use the same token values through JavaScript styles. CSS imports are only for the web package.</p></section>
    <p className="docs-platform-note">The <code>@adrian-danciu</code> packages are being prepared for npm. Until release, clone the repository and run the examples from this workspace.</p>
  </>;
}

function ThemesPage() {
  return <>
    <PageHeader index="02" category="Foundations" title="Themes & tokens" description="One token source powers all three styles. Each style has a light and dark surface palette; accents can change independently." />
    <div className="docs-theme-list">{themeOptions.map(option => {
      const theme = themes[option.value as ThemeName];
      return <article key={option.value}><div><span>STYLE / {option.value.toUpperCase()}</span><h2>{option.label}</h2><p>{option.value === 'paper' ? 'Warm paper and black ink.' : option.value === 'poster' ? 'Editorial contrast and signal red.' : 'Graphite, ultraviolet, and electric lime.'}</p></div><div className="docs-theme-swatches"><span style={{ background: theme.modes.light.canvas }} title="Light canvas" /><span style={{ background: theme.modes.dark.canvas }} title="Dark canvas" /><span style={{ background: accents[theme.defaultAccent as AccentName].base }} title="Default accent" /></div></article>;
    })}</div>
    <section className="docs-section"><div className="docs-section-heading"><h2>Set a style</h2><span>PROVIDER</span></div><CodeBlock code={`<ThemeProvider theme="poster" mode="dark" accent="red">\n  <Button accent="turquoise">Override this button</Button>\n</ThemeProvider>`} /><p className="docs-body-copy">Choose a style and mode at the provider. The accent prop changes the default highlight; components with an accent prop can override it locally.</p></section>
    <section className="docs-section"><div className="docs-section-heading"><h2>Token source</h2><span>ONE FILE</span></div><p className="docs-body-copy">Color, spacing, type, radius, border, sizing, and breakpoint values come from <code>packages/tokens/src/tokens.json</code>. The web package uses generated CSS custom properties; React Native reads the same values as JavaScript. Edit the JSON source and rebuild to change the system.</p></section>
  </>;
}

function ComponentsIndex() {
  return <>
    <PageHeader index="03" category="Index" title="Components" description="Browse the current web component set. Every page includes a live sample, usage code, and a concise API reference." />
    {componentGroups.map(group => <section className="docs-section" key={group.title}><div className="docs-section-heading"><h2>{group.title}</h2><span>{String(group.links.length).padStart(2, '0')} COMPONENTS</span></div><div className="docs-component-list">{group.links.map(link => <a key={link.href} href={link.href}><strong>{link.label}</strong><span>VIEW COMPONENT ↗</span></a>)}</div></section>)}
  </>;
}

function App() {
  const [theme, setTheme] = React.useState<ThemeName>(readTheme);
  const [mode, setMode] = React.useState<ThemeMode>(readMode);
  const [accent, setAccent] = React.useState<AccentName | 'default'>(readAccent);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [path, setPath] = React.useState(() => window.location.pathname.replace(/\/$/, '') || '/');
  const mainRef = React.useRef<HTMLElement>(null);
  const page = path.startsWith('/components/') ? componentPages.find(item => `/components/${item.slug}` === path) : undefined;
  const mark = logoDataUrl(theme, mode, accent);

  function showNewPage() {
    if (mainRef.current) mainRef.current.scrollTop = 0;
    if (window.matchMedia('(max-width: 767px)').matches) window.scrollTo(0, 0);
    window.requestAnimationFrame(() => mainRef.current?.focus({ preventScroll: true }));
  }

  React.useEffect(() => {
    const onPopState = () => {
      setPath(window.location.pathname.replace(/\/$/, '') || '/');
      showNewPage();
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  function handleInternalLinkClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    const anchor = target.closest<HTMLAnchorElement>('a[href]');
    if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;
    const url = new URL(anchor.href);
    if (url.origin !== window.location.origin || url.hash) return;
    const nextPath = url.pathname.replace(/\/$/, '') || '/';
    if (nextPath !== '/' && nextPath !== '/getting-started' && nextPath !== '/themes' && nextPath !== '/components' && !componentPages.some(item => nextPath === `/components/${item.slug}`)) return;
    event.preventDefault();
    if (nextPath === path) return;
    window.history.pushState(null, '', `${url.pathname}${url.search}`);
    setPath(nextPath);
    showNewPage();
  }

  React.useEffect(() => { window.sessionStorage.setItem('ink-ui-docs-theme', theme); }, [theme]);
  React.useEffect(() => { window.sessionStorage.setItem('ink-ui-docs-mode', mode); }, [mode]);
  React.useEffect(() => { window.sessionStorage.setItem('ink-ui-docs-accent', accent); }, [accent]);
  React.useEffect(() => { document.title = `${page?.name ?? (path === '/' ? 'Overview' : path === '/getting-started' ? 'Getting started' : path === '/themes' ? 'Themes & tokens' : 'Components')} — Ink UI`; }, [page, path]);
  React.useEffect(() => { const icon = document.getElementById('ink-ui-favicon') as HTMLLinkElement | null; if (icon) icon.href = mark; }, [mark]);

  return <ThemeProvider theme={theme} mode={mode} accent={accent === 'default' ? undefined : accent} className="docs-app" onClickCapture={handleInternalLinkClick}>
    <div className="docs-topline"><span>INK UI / COMPONENT SYSTEM</span><span>REACT + REACT NATIVE / 001</span></div>
    <header className="docs-masthead">
      <a className="docs-brand" href="/" aria-label="Ink UI home"><img className="docs-brand-mark" src={mark} alt="" /><span>INK UI<small>COMPONENT LIBRARY / DOCUMENTATION</small></span></a>
      <div className="docs-masthead-actions"><a href="http://localhost:3000/">OPEN PREVIEW ↗</a><button type="button" className="docs-menu-toggle" aria-expanded={menuOpen} aria-controls="docs-sidebar" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'CLOSE MENU' : 'MENU'}</button></div>
    </header>
    <div className="docs-layout" data-sidebar-collapsed={sidebarCollapsed}>
      <div id="docs-sidebar" className={['docs-sidebar-wrap', menuOpen && 'is-open'].filter(Boolean).join(' ')}>
        <Sidebar groups={navigation} currentPath={path} label="Documentation" collapsible collapsed={sidebarCollapsed} onCollapsedChange={setSidebarCollapsed} mobileOpen={menuOpen} onMobileOpenChange={setMenuOpen} header={<div className="docs-sidebar-intro"><strong>FIELD GUIDE</strong><span>{String(componentPages.length).padStart(2, '0')} / INDEX</span></div>} footer={<div className="docs-sidebar-foot">HARD LINES.<br />CLEAR ACTIONS.</div>} />
      </div>
      <main className="docs-main" id="main-content" ref={mainRef} tabIndex={-1}>
        <div className="docs-toolbar">
          <span>APPEARANCE / LIVE SYSTEM</span>
          <div className="docs-toolbar-controls">
            <Select label="Style" options={themeOptions} value={theme} onValueChange={value => setTheme(value as ThemeName)} />
            <Select label="Accent" options={accentOptions} value={accent} onValueChange={value => setAccent(value as AccentName | 'default')} />
            <div className="docs-mode-control"><span>MODE</span><Button size="sm" variant="secondary" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>{mode === 'light' ? 'Light / ☀' : 'Dark / ◐'}</Button></div>
          </div>
        </div>
        <div className="docs-content">
          {path === '/' ? <Overview /> : path === '/getting-started' ? <GettingStarted /> : path === '/themes' ? <ThemesPage /> : path === '/components' ? <ComponentsIndex /> : page ? <ComponentDoc page={page} theme={theme} mode={mode} /> : <><PageHeader index="—" category="Not found" title="Missing page" description="This page is not in the field guide." /><a href="/components">Browse components ↗</a></>}
        </div>
        <footer className="docs-footer"><span>INK UI / LOCAL DOCUMENTATION</span><span>POSTER · PAPER · ELECTRIC</span></footer>
      </main>
    </div>
  </ThemeProvider>;
}

createRoot(document.getElementById('root')!).render(<App />);
