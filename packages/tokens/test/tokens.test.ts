import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { themes, tokens } from '../dist/index.js';

test('three styles and two modes expose the same semantic colors', () => {
  const names = Object.keys(themes);
  expect(names).toEqual(['poster', 'paper', 'electric']);
  for (const name of names) {
    for (const mode of ['light', 'dark'] as const) {
      expect(Object.keys(themes[name as keyof typeof themes].modes[mode])).toEqual(Object.keys(themes.paper.modes.light));
    }
  }
});

test('web CSS uses values from the shared token source', () => {
  const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
  expect(css).toContain(`--ui-space-4: ${tokens.space[4]}px;`);
  expect(css).toContain(`--ui-control-size-switch-width: ${tokens.controlSize.switchWidth}px;`);
  expect(css).toContain('--ui-color-accent: #d9525e;');
  expect(css).toContain('[data-ui-theme="electric"][data-ui-mode="light"]');
  expect(css).toContain('[data-ui-accent="turquoise"]');
});

test('primary and canvas text stay readable in each theme', () => {
  function luminance(hex: string) {
    const channels = hex.slice(1).match(/.{2}/g)!.map(channel => parseInt(channel, 16) / 255);
    const [red, green, blue] = channels.map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  }
  function contrast(first: string, second: string) {
    const a = luminance(first);
    const b = luminance(second);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  }
  for (const theme of Object.values(themes)) {
    for (const colors of Object.values(theme.modes)) {
      expect(contrast(colors.text, colors.canvas)).toBeGreaterThanOrEqual(4.5);
    }
  }
  for (const accent of Object.values(tokens.accents)) {
    expect(contrast(accent.on, accent.base)).toBeGreaterThanOrEqual(4.5);
  }
});
