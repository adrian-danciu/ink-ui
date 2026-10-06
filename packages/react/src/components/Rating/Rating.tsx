import * as React from 'react';
import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label: string;
  value: number;
  onValueChange?: (value: number) => void;
  max?: number;
  disabled?: boolean;
  accent?: AccentName;
}

export function Rating({ label, value, onValueChange, max = 5, disabled = false, accent, className, ...props }: RatingProps) {
  const count = Math.max(1, Math.min(10, Math.floor(max) || 5));
  const selected = Math.max(0, Math.min(count, Math.floor(value) || 0));
  const interactive = Boolean(onValueChange) && !disabled;
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!interactive) return;
    const next = event.key === 'Home' ? 1 : event.key === 'End' ? count : event.key === 'ArrowRight' || event.key === 'ArrowUp' ? Math.min(count, selected + 1) : event.key === 'ArrowLeft' || event.key === 'ArrowDown' ? Math.max(1, selected - 1) : null;
    if (next === null) return;
    event.preventDefault();
    onValueChange?.(next);
    event.currentTarget.querySelectorAll('button')[next - 1]?.focus();
  }
  return <div className={['ui-rating', className].filter(Boolean).join(' ')} data-ui-accent={accent} data-disabled={disabled} {...props}>
    <span className="ui-rating-label">{label}</span>
    <div className="ui-rating-stars" role="radiogroup" aria-label={label} aria-disabled={disabled || !onValueChange} onKeyDown={handleKeyDown}>
      {Array.from({ length: count }, (_, index) => <button key={index} type="button" role="radio" aria-label={`${index + 1} of ${count}`} aria-checked={selected === index + 1} data-filled={index < selected} disabled={!interactive} tabIndex={interactive && (index + 1 === (selected || 1)) ? 0 : -1} onClick={() => onValueChange?.(index + 1)}>★</button>)}
    </div>
  </div>;
}
