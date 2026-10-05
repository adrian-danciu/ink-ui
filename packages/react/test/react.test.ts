import { expect, test } from 'bun:test';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Accordion, Alert, Badge, Button, Card, Checkbox, Dialog, EmptyState, IconButton, ProgressBar, RadioGroup, Select, Switch, Tabs, TextArea, TextField, ThemeProvider, Toast } from '../dist/index.js';

test('button renders with its theme, size, and accessible button element', () => {
  const markup = renderToStaticMarkup(
    React.createElement(ThemeProvider, { theme: 'paper', mode: 'dark', accent: 'yellow' },
      React.createElement(Button, { size: 'lg', variant: 'primary', accent: 'turquoise' }, 'Continue')),
  );
  expect(markup).toContain('data-ui-theme="paper"');
  expect(markup).toContain('data-ui-mode="dark"');
  expect(markup).toContain('data-ui-accent="yellow"');
  expect(markup).toContain('<button');
  expect(markup).toContain('type="button"');
  expect(markup).toContain('data-size="lg"');
  expect(markup).toContain('data-variant="primary"');
  expect(markup).toContain('data-ui-accent="turquoise"');
});

test('field and checkbox preserve accessible labels and error state', () => {
  const markup = renderToStaticMarkup(React.createElement(ThemeProvider, { theme: 'paper' },
    React.createElement(React.Fragment, null,
      React.createElement(TextField, { id: 'lookup', label: 'Reference code', errorText: 'Code not found' }),
      React.createElement(Checkbox, { label: 'Save result', checked: true, onCheckedChange: () => {} }),
    ),
  ));
  expect(markup).toContain('for="lookup"');
  expect(markup).toContain('aria-invalid="true"');
  expect(markup).toContain('aria-describedby="lookup-message"');
  expect(markup).toContain('type="checkbox"');
  expect(markup).toContain('checked=""');
  expect(markup).toContain('Save result');
});

test('card and badge expose their content and tone', () => {
  const markup = renderToStaticMarkup(React.createElement(Card, { title: 'A stronger signal', eyebrow: 'Field note', accent: 'turquoise' },
    React.createElement(Badge, { tone: 'success' }, 'Live')),
  );
  expect(markup).toContain('A stronger signal');
  expect(markup).toContain('data-ui-accent="turquoise"');
  expect(markup).toContain('data-tone="success"');
});

test('switch and radio group expose their selection state', () => {
  const markup = renderToStaticMarkup(React.createElement(ThemeProvider, { theme: 'electric', accent: 'lime' },
    React.createElement(React.Fragment, null,
      React.createElement(Switch, { label: 'Live updates', checked: true, onCheckedChange: () => {} }),
      React.createElement(RadioGroup, { label: 'Frequency', name: 'frequency', options: [{ label: 'Daily', value: 'daily' }, { label: 'Weekly', value: 'weekly' }], value: 'weekly', onValueChange: () => {} }),
    ),
  ));
  expect(markup).toContain('role="switch"');
  expect(markup).toContain('aria-checked="true"');
  expect(markup).toContain('<legend class="ui-radio-legend">Frequency</legend>');
  expect(markup).toContain('name="frequency"');
  expect(markup).toMatch(/<input[^>]*checked=""[^>]*value="weekly"/);
});

test('alert semantics and progress values render safely', () => {
  const markup = renderToStaticMarkup(React.createElement(React.Fragment, null,
    React.createElement(Alert, { title: 'Action required', description: 'Check your details', tone: 'danger' }),
    React.createElement(ProgressBar, { label: 'Upload', value: 142, accent: 'pink' }),
    React.createElement(ProgressBar, { value: Number.NaN }),
  ));
  expect(markup).toContain('role="alert"');
  expect(markup).toContain('Action required');
  expect(markup).toContain('aria-valuenow="100"');
  expect(markup).toContain('width:100%');
  expect(markup).toContain('aria-valuenow="0"');
});

test('text area associates its label and error message', () => {
  const markup = renderToStaticMarkup(React.createElement(TextArea, { id: 'notes', label: 'Field notes', errorText: 'Required', defaultValue: 'Draft' }));
  expect(markup).toContain('for="notes"');
  expect(markup).toContain('aria-describedby="notes-message"');
  expect(markup).toContain('aria-invalid="true"');
  expect(markup).toContain('Draft</textarea>');
});

test('tabs and accordion expose selected and expanded panels', () => {
  const markup = renderToStaticMarkup(React.createElement(React.Fragment, null,
    React.createElement(Tabs, { label: 'Sections', tabs: [{ label: 'Overview', value: 'overview', content: 'Summary' }, { label: 'Details', value: 'details', content: 'Specifications' }], value: 'details', onValueChange: () => {} }),
    React.createElement(Accordion, { items: [{ title: 'Materials', value: 'materials', content: 'Paper' }, { title: 'Usage', value: 'usage', content: 'Daily' }], value: 'materials', onValueChange: () => {} }),
  ));
  expect(markup).toContain('role="tablist" aria-label="Sections"');
  expect(markup).toContain('aria-selected="true"');
  expect(markup).toContain('role="tabpanel"');
  expect(markup).toContain('aria-expanded="true"');
  expect(markup).toContain('aria-expanded="false"');
  expect(markup).toContain('hidden=""');
});

test('empty state includes an optional action', () => {
  const markup = renderToStaticMarkup(React.createElement(EmptyState, { title: 'Nothing here', description: 'Start a collection' }, React.createElement(Button, null, 'Create')));
  expect(markup).toContain('Nothing here');
  expect(markup).toContain('Start a collection');
  expect(markup).toContain('Create</button>');
});

test('select and icon button expose accessible names and values', () => {
  const markup = renderToStaticMarkup(React.createElement(React.Fragment, null,
    React.createElement(Select, { id: 'category', label: 'Category', options: [{ label: 'Design', value: 'design' }, { label: 'Writing', value: 'writing' }], value: 'writing', onValueChange: () => {} }),
    React.createElement(IconButton, { label: 'Add favorite', icon: '★', accent: 'lime' }),
  ));
  expect(markup).toContain('for="category"');
  expect(markup).toContain('<select');
  expect(markup).toMatch(/value="writing" selected=""/);
  expect(markup).toContain('aria-label="Add favorite"');
  expect(markup).toContain('aria-hidden="true">★');
});

test('dialog and toast expose titles and dismissal controls', () => {
  const markup = renderToStaticMarkup(React.createElement(React.Fragment, null,
    React.createElement(Dialog, { open: true, onOpenChange: () => {}, title: 'Publish?', description: 'Make it public.' }, React.createElement(Button, null, 'Confirm')),
    React.createElement(Toast, { open: true, title: 'Saved', description: 'Changes ready', tone: 'success', onDismiss: () => {} }),
  ));
  expect(markup).toContain('<dialog');
  expect(markup).toContain('aria-labelledby=');
  expect(markup).toContain('Close dialog');
  expect(markup).toContain('role="status"');
  expect(markup).toContain('Dismiss notification');
  expect(markup).toContain('Changes ready');
});
