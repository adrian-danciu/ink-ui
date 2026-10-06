import * as React from 'react';
import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface ComboboxOption { label: string; value: string; disabled?: boolean }
export interface ComboboxProps {
  label: string;
  options: readonly ComboboxOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  accent?: AccentName;
}

export function Combobox({ label, options, value, onValueChange, placeholder = 'Search options', emptyMessage = 'No matches', disabled = false, accent }: ComboboxProps) {
  const id = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const selected = options.find(option => option.value === value);
  const [query, setQuery] = React.useState(selected?.label ?? '');
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const filtered = options.filter(option => option.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  React.useEffect(() => { if (!open) setQuery(selected?.label ?? ''); }, [open, selected?.label]);
  React.useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);
  function choose(option: ComboboxOption) { if (option.disabled) return; onValueChange(option.value); setQuery(option.label); setOpen(false); }
  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') { setOpen(false); setQuery(selected?.label ?? ''); return; }
    const available = filtered.map((option, index) => option.disabled ? -1 : index).filter(index => index >= 0);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); setOpen(true);
      if (!available.length) return;
      const current = available.indexOf(activeIndex);
      const offset = event.key === 'ArrowDown' ? 1 : -1;
      setActiveIndex(available[(current + offset + available.length) % available.length]);
    } else if (event.key === 'Enter' && open && filtered[activeIndex] && !filtered[activeIndex].disabled) { event.preventDefault(); choose(filtered[activeIndex]); }
  }
  return <div ref={rootRef} className="ui-combobox" data-ui-accent={accent} onBlurCapture={event => { if (!rootRef.current?.contains(event.relatedTarget as Node)) setOpen(false); }}>
    <label htmlFor={`${id}-input`}>{label}</label>
    <input id={`${id}-input`} role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls={open ? `${id}-list` : undefined} aria-activedescendant={open && filtered[activeIndex] ? `${id}-option-${activeIndex}` : undefined} autoComplete="off" disabled={disabled} placeholder={placeholder} value={query} onFocus={() => { setQuery(''); setOpen(true); setActiveIndex(0); }} onChange={event => { setQuery(event.currentTarget.value); setActiveIndex(0); setOpen(true); }} onKeyDown={onKeyDown} />
    {open && <div id={`${id}-list`} role="listbox" aria-label={label} className="ui-combobox-list">
      {filtered.length ? filtered.map((option, index) => <button key={option.value} id={`${id}-option-${index}`} type="button" role="option" aria-selected={option.value === value} data-active={activeIndex === index} disabled={option.disabled} tabIndex={-1} onMouseDown={event => event.preventDefault()} onMouseEnter={() => setActiveIndex(index)} onClick={() => choose(option)}>{option.label}</button>) : <span className="ui-combobox-empty">{emptyMessage}</span>}
    </div>}
  </div>;
}
