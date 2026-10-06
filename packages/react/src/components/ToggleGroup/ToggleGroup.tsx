import * as React from 'react';
import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface ToggleGroupOption { label: string; value: string; disabled?: boolean }
export interface ToggleGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label: string;
  options: readonly ToggleGroupOption[];
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  accent?: AccentName;
}

export function ToggleGroup({ label, options, value, onValueChange, disabled = false, accent, className, ...props }: ToggleGroupProps) {
  return <div role="group" aria-label={label} className={['ui-toggle-group', className].filter(Boolean).join(' ')} data-ui-accent={accent} {...props}>
    {options.map(option => <button key={option.value} type="button" aria-pressed={value === option.value} disabled={disabled || option.disabled} onClick={() => onValueChange(option.value)}>{option.label}</button>)}
  </div>;
}
