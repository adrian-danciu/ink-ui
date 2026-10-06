import * as React from 'react';
import { createPortal } from 'react-dom';
import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface TooltipProps {
  label: string;
  content: string;
  children?: string;
  side?: 'top' | 'bottom';
  accent?: AccentName;
}

interface Placement {
  left: number;
  top: number;
  visible: boolean;
  colors: React.CSSProperties;
}

export function Tooltip({ label, content, children, side = 'top', accent }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<Placement>({ left: 0, top: 0, visible: false, colors: {} });
  const id = React.useId();
  const rootRef = React.useRef<HTMLSpanElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const contentRef = React.useRef<HTMLSpanElement>(null);

  React.useLayoutEffect(() => {
    if (!open) return;
    function position() {
      const trigger = triggerRef.current;
      const tooltip = contentRef.current;
      if (!trigger || !tooltip) return;
      const triggerRect = trigger.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const computed = getComputedStyle(trigger);
      const gap = Number.parseFloat(computed.getPropertyValue('--ui-space-2')) || 8;
      const margin = gap;
      const top = triggerRect.top - tooltipRect.height - gap;
      const bottom = triggerRect.bottom + gap;
      const preferred = side === 'top' ? top : bottom;
      const alternate = side === 'top' ? bottom : top;
      const fits = (y: number) => y >= margin && y + tooltipRect.height <= window.innerHeight - margin;
      const chosen = fits(preferred) ? preferred : fits(alternate) ? alternate : preferred;
      const left = Math.max(margin, Math.min(triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2, window.innerWidth - tooltipRect.width - margin));
      const boundedTop = Math.max(margin, Math.min(chosen, window.innerHeight - tooltipRect.height - margin));
      const colors = Object.fromEntries(['accent', 'accent-text', 'border', 'shadow'].map(name => [`--ui-color-${name}`, computed.getPropertyValue(`--ui-color-${name}`)])) as React.CSSProperties;
      setPlacement({ left, top: boundedTop, visible: true, colors });
    }
    position();
    window.addEventListener('resize', position);
    window.addEventListener('scroll', position, true);
    return () => { window.removeEventListener('resize', position); window.removeEventListener('scroll', position, true); };
  }, [open, side, content, accent]);

  React.useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  return <span ref={rootRef} className="ui-tooltip" data-side={side} data-ui-accent={accent}>
    <button ref={triggerRef} type="button" aria-label={label} aria-describedby={open ? id : undefined} aria-expanded={open} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} onClick={() => setOpen(true)} onKeyDown={event => { if (event.key === 'Escape') setOpen(false); }}>{children ?? label}</button>
    {open && createPortal(<span ref={contentRef} id={id} className="ui-tooltip-content" role="tooltip" style={{ ...placement.colors, left: placement.left, top: placement.top, visibility: placement.visible ? 'visible' : 'hidden' }}>{content}</span>, document.body)}
  </span>;
}
