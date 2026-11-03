import * as React from 'react';
import { CodeBlock, PageHeader } from './docs-ui';

export function NextGuide() {
  return <>
    <PageHeader index="04" category="Guide / web" title="React & Next.js" description="Install the web package, load its stylesheet once, and put interactive components inside a client boundary in Next.js." />
    <section className="docs-section"><div className="docs-section-heading"><h2>Install</h2><span>CHOOSE ONE</span></div><CodeBlock label="NPM / INSTALL" code="npm install @adrian-danciu/ink-ui" /><p className="docs-body-copy">Using Bun? Run <code>bun add @adrian-danciu/ink-ui</code> instead. Your app provides the React and React DOM peer dependencies.</p></section>
    <section className="docs-section"><div className="docs-section-heading"><h2>React app</h2><span>ONE STYLESHEET</span></div><CodeBlock code={`import '@adrian-danciu/ink-ui/styles.css';
import { Button, ThemeProvider } from '@adrian-danciu/ink-ui';

export function App() {
  return <ThemeProvider theme="paper" mode="light" accent="red">
    <Button onClick={() => console.log('Continue')}>Continue</Button>
  </ThemeProvider>;
}`} /><p className="docs-body-copy">Import <code>styles.css</code> once at your app entry point. Components inside <code>ThemeProvider</code> inherit its style, mode, and accent.</p></section>
    <section className="docs-section"><div className="docs-section-heading"><h2>Next.js App Router</h2><span>ROOT LAYOUT</span></div><CodeBlock label="APP / LAYOUT.TSX" code={`import '@adrian-danciu/ink-ui/styles.css';
import { ThemeProvider } from '@adrian-danciu/ink-ui';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <ThemeProvider theme="poster" mode="dark" accent="red">{children}</ThemeProvider>
  </body></html>;
}`} /><p className="docs-body-copy">Interactive component handlers belong in a client component. Keep the root layout focused on the stylesheet and provider.</p><CodeBlock label="APP / ACTIONS.TSX" code={`'use client';

import { Button } from '@adrian-danciu/ink-ui';

export function Actions() {
  return <Button onClick={() => alert('Ready')}>Continue</Button>;
}`} /></section>
    <section className="docs-section"><div className="docs-section-heading"><h2>What to read next</h2><span>BUILD / 02</span></div><p className="docs-body-copy">Explore <a href="/themes">themes and accents</a>, then open the <a href="/components">component index</a> for live behavior and prop tables. React Native uses a separate package and platform-specific event props; see the <a href="/react-native">mobile guide</a>.</p></section>
  </>;
}

export function NativeGuide() {
  return <>
    <PageHeader index="05" category="Guide / mobile" title="React Native" description="Use the native package in a React Native or Expo app. It shares Ink UI's tokens and component names with web, with native interaction props." />
    <section className="docs-section"><div className="docs-section-heading"><h2>Install</h2><span>EXPO / REACT NATIVE</span></div><CodeBlock label="NPM / INSTALL" code="npm install @adrian-danciu/ink-ui-native" /><p className="docs-body-copy">Using Bun? Run <code>bun add @adrian-danciu/ink-ui-native</code>. Your app provides the React and React Native peer dependencies. Do not import the web stylesheet in a native app.</p></section>
    <section className="docs-section"><div className="docs-section-heading"><h2>First screen</h2><span>THEME + BUTTON</span></div><CodeBlock code={`import * as React from 'react';
import { Text, View } from 'react-native';
import { Button, ThemeProvider } from '@adrian-danciu/ink-ui-native';

export function HomeScreen() {
  const [count, setCount] = React.useState(0);
  return <ThemeProvider theme="electric" mode="dark" accent="lime">
    <View>
      <Button onPress={() => setCount(value => value + 1)}>Add one</Button>
      <Text>Count: {count}</Text>
    </View>
  </ThemeProvider>;
}`} /><p className="docs-body-copy">The provider accepts <code>poster</code>, <code>paper</code>, or <code>electric</code>; <code>light</code> or <code>dark</code>; and any of the six accents shown in the <a href="/themes">theme guide</a>.</p></section>
    <section className="docs-section"><div className="docs-section-heading"><h2>Controlled overlays</h2><span>SHEET / RIGHT EDGE</span></div><CodeBlock code={`import * as React from 'react';
import { Text } from 'react-native';
import { Button, Sheet } from '@adrian-danciu/ink-ui-native';

export function Details() {
  const [open, setOpen] = React.useState(false);
  return <>
    <Button onPress={() => setOpen(true)}>Open details</Button>
    <Sheet open={open} onOpenChange={setOpen} title="Details">
      <Text>More information goes here.</Text>
    </Sheet>
  </>;
}`} /><p className="docs-body-copy">The native Sheet enters from the right by default; set <code>side</code> to <code>left</code>, <code>top</code>, or <code>bottom</code> when needed. Dialog, Sheet, and mobile Sidebar use controlled open state and provide close controls.</p></section>
    <section className="docs-section"><div className="docs-section-heading"><h2>Navigation</h2><span>YOUR ROUTER</span></div><CodeBlock code={`import * as React from 'react';
import { Button, Sidebar } from '@adrian-danciu/ink-ui-native';

export function Navigation() {
  const [route, setRoute] = React.useState('/home');
  const [menuOpen, setMenuOpen] = React.useState(false);
  return <>
    <Button onPress={() => setMenuOpen(true)}>Open menu</Button>
    <Sidebar
      groups={[{ title: 'Pages', links: [
        { label: 'Home', href: '/home' },
        { label: 'Settings', href: '/settings' },
      ] }]}
      currentPath={route}
      mobileOpen={menuOpen}
      onMobileOpenChange={setMenuOpen}
      onNavigate={setRoute}
    />
  </>;
}`} /><p className="docs-body-copy">This example tracks the selected route locally. Connect <code>onNavigate</code> to your navigation library to change screens. Supply <code>mobileOpen</code> for a left-side drawer, or omit it for an inline Sidebar.</p></section>
    <section className="docs-section"><div className="docs-section-heading"><h2>Platform differences</h2><span>WEB ↔ MOBILE</span></div><div className="docs-table-wrap"><table className="docs-table"><thead><tr><th>Concern</th><th>React / Next.js</th><th>React Native</th></tr></thead><tbody>
      <tr><th scope="row">Package</th><td><code>@adrian-danciu/ink-ui</code></td><td><code>@adrian-danciu/ink-ui-native</code></td></tr>
      <tr><th scope="row">Styling</th><td>Import <code>styles.css</code> once</td><td>JavaScript styles from shared tokens</td></tr>
      <tr><th scope="row">Button event</th><td><code>onClick</code></td><td><code>onPress</code></td></tr>
      <tr><th scope="row">Sidebar navigation</th><td>Links or <code>onNavigate(event, href)</code></td><td><code>onNavigate(href)</code> callback</td></tr>
    </tbody></table></div></section>
  </>;
}
