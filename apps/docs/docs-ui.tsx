import * as React from 'react';

export function CodeBlock({ code, label = 'TSX / EXAMPLE' }: { code: string; label?: string }) {
  const [copied, setCopied] = React.useState(false);
  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }
  return <div className="docs-code">
    <div className="docs-code-head"><span>{label}</span><button type="button" onClick={copy}>{copied ? 'COPIED' : 'COPY'}</button></div>
    <pre><code>{code}</code></pre>
  </div>;
}

export function PageHeader({ index, category, title, description }: { index: string; category: string; title: string; description: string }) {
  return <header className="docs-page-header">
    <div className="docs-eyebrow"><span>{category.toUpperCase()}</span><span>ISSUE {index}</span></div>
    <h1>{title}</h1>
    <p>{description}</p>
  </header>;
}
