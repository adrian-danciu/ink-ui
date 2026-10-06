import * as React from 'react';
import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange' | 'value' | 'min' | 'max' | 'step'> {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  accent?: AccentName;
}

export function Slider({ label, value, onValueChange, min = 0, max = 100, step = 1, accent, id, disabled, className, ...props }: SliderProps) {
  const generatedId = React.useId();
  const low = Number.isFinite(min) ? min : 0;
  const high = Number.isFinite(max) && max > low ? max : low + 100;
  const increment = Number.isFinite(step) && step > 0 ? step : 1;
  const current = Number.isFinite(value) ? Math.min(high, Math.max(low, value)) : low;
  const percent = ((current - low) / (high - low)) * 100;
  const inputId = id ?? generatedId;
  return <div className={['ui-slider', className].filter(Boolean).join(' ')} data-ui-accent={accent} data-disabled={disabled}>
    <div className="ui-slider-heading"><label htmlFor={inputId}>{label}</label><output htmlFor={inputId}>{current}</output></div>
    <input {...props} id={inputId} type="range" min={low} max={high} step={increment} value={current} disabled={disabled} onChange={event => onValueChange(Number(event.currentTarget.value))} style={{ '--ui-slider-progress': `${percent}%` } as React.CSSProperties} />
  </div>;
}
