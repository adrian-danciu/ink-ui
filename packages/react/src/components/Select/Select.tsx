import * as React from 'react';

export interface SelectProps {
  label: string;
  options: readonly { label: string; value: string }[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
}

export function Select({ label, options, value, onValueChange, placeholder, disabled, required, name, id }: SelectProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  return <div className="ui-field">
    <label className="ui-field-label" htmlFor={inputId}>{label}{required && <span aria-hidden="true"> *</span>}</label>
    <div className="ui-select-wrap">
      <select id={inputId} name={name} value={value} disabled={disabled} required={required} className="ui-input ui-select" onChange={event => onValueChange(event.currentTarget.value)}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <span className="ui-select-chevron" aria-hidden="true">⌄</span>
    </div>
  </div>;
}
