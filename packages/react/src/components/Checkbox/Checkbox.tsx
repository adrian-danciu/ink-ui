import type { AccentName } from '@ui-library/tokens';

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  accent?: AccentName;
  name?: string;
  id?: string;
}

export function Checkbox({ label, checked, onCheckedChange, disabled, accent, name, id }: CheckboxProps) {
  return <label className="ui-checkbox" data-ui-accent={accent}>
    <input id={id} name={name} type="checkbox" checked={checked} disabled={disabled} onChange={event => onCheckedChange(event.currentTarget.checked)} />
    <span className="ui-checkbox-mark" aria-hidden="true" />
    <span className="ui-checkbox-label">{label}</span>
  </label>;
}
