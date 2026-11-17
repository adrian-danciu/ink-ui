import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  accent?: AccentName;
  motion?: boolean;
  name?: string;
  id?: string;
}

export function Checkbox({ label, checked, onCheckedChange, disabled, accent, motion, name, id }: CheckboxProps) {
  return <label className="ui-checkbox" data-ui-accent={accent} data-ui-motion={motion === undefined ? undefined : motion ? 'on' : 'off'}>
    <input id={id} name={name} type="checkbox" checked={checked} disabled={disabled} onChange={event => onCheckedChange(event.currentTarget.checked)} />
    <span className="ui-checkbox-mark" aria-hidden="true" />
    <span className="ui-checkbox-label">{label}</span>
  </label>;
}
