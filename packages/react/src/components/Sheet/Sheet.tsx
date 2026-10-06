import * as React from 'react';
import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  side?: 'left' | 'right' | 'top' | 'bottom';
  accent?: AccentName;
  children?: React.ReactNode;
}

export function Sheet({ open, onOpenChange, title, description, side = 'right', accent, children }: SheetProps) {
  const ref = React.useRef<HTMLDialogElement>(null);
  const id = React.useId();
  React.useEffect(() => {
    const sheet = ref.current;
    if (!sheet) return;
    if (open && !sheet.open) sheet.showModal();
    else if (!open && sheet.open) sheet.close();
  }, [open]);
  return <dialog ref={ref} className="ui-sheet" data-side={side} data-ui-accent={accent} aria-labelledby={`${id}-title`} aria-describedby={description ? `${id}-description` : undefined} onCancel={event => { event.preventDefault(); onOpenChange(false); }} onClick={event => { if (event.target === event.currentTarget) onOpenChange(false); }}>
    <div className="ui-sheet-inner">
      <div className="ui-sheet-heading"><span className="ui-sheet-kicker">PANEL / 001</span><button type="button" aria-label="Close panel" onClick={() => onOpenChange(false)}>×</button></div>
      <h2 id={`${id}-title`}>{title}</h2>
      {description && <p id={`${id}-description`}>{description}</p>}
      <div className="ui-sheet-content">{children}</div>
    </div>
  </dialog>;
}
