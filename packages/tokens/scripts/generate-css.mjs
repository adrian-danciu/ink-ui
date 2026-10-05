import { readFile, writeFile } from 'node:fs/promises';

const source = JSON.parse(await readFile(new URL('../src/tokens.json', import.meta.url), 'utf8'));
const lines = ['/* Generated from src/tokens.json. Do not edit by hand. */'];

function numericVariables() {
  const result = [];
  for (const group of ['space', 'radius', 'borderWidth', 'shadowOffset', 'fontSize', 'fontWeight', 'fontFamily', 'letterSpacing', 'componentSize', 'controlSize', 'lineHeight', 'breakpoint', 'motionDuration', 'opacity']) {
    for (const [name, value] of Object.entries(source[group])) {
      const unit = group === 'motionDuration' ? 'ms' : ['fontWeight', 'fontFamily', 'opacity'].includes(group) ? '' : 'px';
      const prefix = group.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
      const key = name.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
      result.push(`  --ui-${prefix}-${key}: ${value}${unit};`);
    }
  }
  return result;
}

function colorVariables(colors) {
  return Object.entries(colors).map(([name, value]) => {
    const key = name.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    return `  --ui-color-${key}: ${value};`;
  });
}

lines.push(':root {', ...numericVariables(), ...colorVariables(source.themes.paper.modes.light),
  `  --ui-color-accent: ${source.accents.red.base};`,
  `  --ui-color-accent-text: ${source.accents.red.on};`, '}');
for (const [name, theme] of Object.entries(source.themes)) {
  for (const [mode, colors] of Object.entries(theme.modes)) {
    lines.push(`[data-ui-theme="${name}"][data-ui-mode="${mode}"] {`, ...colorVariables(colors), '}');
  }
}
for (const [name, accent] of Object.entries(source.accents)) {
  lines.push(`[data-ui-accent="${name}"] {`,
    `  --ui-color-accent: ${accent.base};`,
    `  --ui-color-accent-text: ${accent.on};`, '}');
}

await writeFile(new URL('../styles.css', import.meta.url), `${lines.join('\n')}\n`);
