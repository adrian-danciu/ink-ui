import * as React from 'react';
import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface RadioGroupProps {
  label: string;
  options: readonly { label: string; value: string }[];
  value: string;
  onValueChange: (value: string) => void;
  name?: string;
  disabled?: boolean;
  accent?: AccentName;
}

export function RadioGroup({ label, options, value, onValueChange, name, disabled, accent }: RadioGroupProps) {
  const generatedName = React.useId();
  const groupName = name ?? generatedName;
  return <fieldset className="ui-radio-group" disabled={disabled} data-ui-accent={accent}>
    <legend className="ui-radio-legend">{label}</legend>
    <div className="ui-radio-options">
      {options.map(option => <label className="ui-radio-option" key={option.value}>
        <input type="radio" name={groupName} value={option.value} checked={value === option.value} onChange={() => onValueChange(option.value)} />
        <span className="ui-radio-mark" aria-hidden="true" />
        <span>{option.label}</span>
      </label>)}
    </div>
  </fieldset>;
}
