import * as React from 'react';
import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface TooltipProps {
  label: string;
  content: string;
  children?: string;
  side?: 'top' | 'bottom';
  accent?: AccentName;
}

export function Tooltip({ label, content, children, side = 'top', accent }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();
  const rootRef = React.useRef<HTMLSpanElement>(null);
  React.useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);
  return <span ref={rootRef} className="ui-tooltip" data-side={side} data-ui-accent={accent}>
    <button type="button" aria-label={label} aria-describedby={open ? id : undefined} aria-expanded={open} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} onClick={() => setOpen(true)} onKeyDown={event => { if (event.key === 'Escape') setOpen(false); }}>{children ?? label}</button>
    {open && <span id={id} className="ui-tooltip-content" role="tooltip">{content}</span>}
  </span>;
}
