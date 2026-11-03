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
  const [activeValue, setActiveValue] = React.useState<string | null>(null);
  const filtered = options.filter(option => option.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  const available = filtered.filter(option => !option.disabled);
  const activeIndex = filtered.findIndex(option => option.value === activeValue && !option.disabled);
  const activeOption = activeIndex >= 0 ? filtered[activeIndex] : undefined;
  React.useEffect(() => { if (!open) setQuery(selected?.label ?? ''); }, [open, selected?.label]);
  React.useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);
  function openOptions() { setQuery(''); setActiveValue(options.find(option => !option.disabled)?.value ?? null); setOpen(true); }
  function choose(option: ComboboxOption) { if (option.disabled) return; onValueChange(option.value); setQuery(option.label); setActiveValue(null); setOpen(false); }
  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape' && open) { event.preventDefault(); setOpen(false); setQuery(selected?.label ?? ''); setActiveValue(null); return; }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); setOpen(true);
      const candidates = open ? available : options.filter(option => !option.disabled);
      if (!open) setQuery('');
      if (!candidates.length) { setActiveValue(null); return; }
      const current = open ? candidates.findIndex(option => option.value === activeValue) : -1;
      const next = current < 0 ? (event.key === 'ArrowDown' ? 0 : candidates.length - 1) : (current + (event.key === 'ArrowDown' ? 1 : -1) + candidates.length) % candidates.length;
      setActiveValue(candidates[next].value);
    } else if (event.key === 'Enter' && open && activeOption) { event.preventDefault(); choose(activeOption); }
  }
  return <div ref={rootRef} className="ui-combobox" data-ui-accent={accent} onBlurCapture={event => { if (!rootRef.current?.contains(event.relatedTarget as Node)) setOpen(false); }}>
    <label htmlFor={`${id}-input`}>{label}</label>
    <input id={`${id}-input`} role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls={open ? `${id}-list` : undefined} aria-activedescendant={open && activeOption ? `${id}-option-${activeIndex}` : undefined} autoComplete="off" disabled={disabled} placeholder={placeholder} value={query} onFocus={openOptions} onClick={() => { if (!open) openOptions(); }} onChange={event => { const nextQuery = event.currentTarget.value; setQuery(nextQuery); setActiveValue(options.find(option => !option.disabled && option.label.toLocaleLowerCase().includes(nextQuery.toLocaleLowerCase()))?.value ?? null); setOpen(true); }} onKeyDown={onKeyDown} />
    {open && <div id={`${id}-list`} role="listbox" aria-label={label} className="ui-combobox-list">
      {filtered.length ? filtered.map((option, index) => <button key={option.value} id={`${id}-option-${index}`} type="button" role="option" aria-selected={option.value === value} data-active={activeIndex === index} disabled={option.disabled} tabIndex={-1} onMouseDown={event => event.preventDefault()} onMouseEnter={() => { if (!option.disabled) setActiveValue(option.value); }} onClick={() => choose(option)}>{option.label}</button>) : <span className="ui-combobox-empty">{emptyMessage}</span>}
    </div>}
  </div>;
}
