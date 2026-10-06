import * as React from 'react';
import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface ChipProps {
  label: string;
  variant?: 'filled' | 'outlined';
  selected?: boolean;
  disabled?: boolean;
  accent?: AccentName;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onRemove?: () => void;
}

export function Chip({ label, variant = 'filled', selected = false, disabled = false, accent, onClick, onRemove }: ChipProps) {
  return <span className="ui-chip" data-variant={variant} data-selected={selected} data-disabled={disabled} data-ui-accent={accent}>
    {onClick ? <button type="button" className="ui-chip-label" aria-pressed={selected} disabled={disabled} onClick={onClick}>{label}</button> : <span className="ui-chip-label">{label}</span>}
    {onRemove && <button type="button" className="ui-chip-remove" aria-label={`Remove ${label}`} disabled={disabled} onClick={onRemove}>×</button>}
  </span>;
}
