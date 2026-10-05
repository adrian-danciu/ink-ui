import * as React from 'react';
import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  accent?: AccentName;
  children?: React.ReactNode;
}

export function Dialog({ open, onOpenChange, title, description, accent, children }: DialogProps) {
  const ref = React.useRef<HTMLDialogElement>(null);
  const id = React.useId();
  React.useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);
  return <dialog ref={ref} className="ui-dialog" data-ui-accent={accent} aria-labelledby={`${id}-title`} aria-describedby={description ? `${id}-description` : undefined} onCancel={event => { event.preventDefault(); onOpenChange(false); }}>
    <div className="ui-dialog-header"><span className="ui-dialog-kicker">ATTENTION / 001</span><button className="ui-dialog-close" type="button" aria-label="Close dialog" onClick={() => onOpenChange(false)}>×</button></div>
    <h2 className="ui-dialog-title" id={`${id}-title`}>{title}</h2>
    {description && <p className="ui-dialog-description" id={`${id}-description`}>{description}</p>}
    {children && <div className="ui-dialog-content">{children}</div>}
  </dialog>;
}
