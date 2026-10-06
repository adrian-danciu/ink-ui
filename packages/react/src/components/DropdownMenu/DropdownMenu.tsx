import * as React from 'react';
import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface DropdownMenuItem { id: string; label: string; disabled?: boolean; destructive?: boolean }
export interface DropdownMenuProps {
  label: string;
  items: readonly DropdownMenuItem[];
  onItemSelect: (id: string) => void;
  disabled?: boolean;
  accent?: AccentName;
}

export function DropdownMenu({ label, items, onItemSelect, disabled = false, accent }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  React.useEffect(() => {
    if (!open) return;
    itemRefs.current.find(item => item && !item.disabled)?.focus();
    function onPointerDown(event: PointerEvent) { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);
  function close(restoreFocus = false) { setOpen(false); if (restoreFocus) triggerRef.current?.focus(); }
  function onMenuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') { event.preventDefault(); close(true); return; }
    if (event.key === 'Tab') { close(); return; }
    const available = itemRefs.current.filter((item): item is HTMLButtonElement => !!item && !item.disabled);
    if (!available.length) return;
    const current = available.indexOf(document.activeElement as HTMLButtonElement);
    const next = event.key === 'ArrowDown' ? available[(current + 1) % available.length] : event.key === 'ArrowUp' ? available[(current - 1 + available.length) % available.length] : event.key === 'Home' ? available[0] : event.key === 'End' ? available[available.length - 1] : null;
    if (next) { event.preventDefault(); next.focus(); }
  }
  return <div ref={rootRef} className="ui-dropdown-menu" data-ui-accent={accent}>
    <button ref={triggerRef} id={`${id}-trigger`} type="button" className="ui-dropdown-trigger" aria-haspopup="menu" aria-expanded={open} aria-controls={open ? `${id}-menu` : undefined} disabled={disabled} onClick={() => setOpen(value => !value)} onKeyDown={event => { if (event.key === 'Escape') close(true); }}>{label}<span aria-hidden="true">⌄</span></button>
    {open && <div id={`${id}-menu`} role="menu" aria-labelledby={`${id}-trigger`} className="ui-dropdown-panel" onKeyDown={onMenuKeyDown} onBlur={event => { if (!rootRef.current?.contains(event.relatedTarget as Node)) close(); }}>
      {items.map((item, index) => <button key={item.id} ref={node => { itemRefs.current[index] = node; }} type="button" role="menuitem" disabled={item.disabled} data-destructive={item.destructive} tabIndex={-1} onClick={() => { onItemSelect(item.id); close(true); }}>{item.label}</button>)}
    </div>}
  </div>;
}
