import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface SwitchProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  accent?: AccentName;
}

export function Switch({ label, checked, onCheckedChange, disabled, accent }: SwitchProps) {
  return <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    className="ui-switch"
    data-ui-accent={accent}
    onClick={() => onCheckedChange(!checked)}
  >
    <span className="ui-switch-track" aria-hidden="true"><span className="ui-switch-thumb" /></span>
    <span className="ui-switch-label">{label}</span>
  </button>;
}
