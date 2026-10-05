import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface ProgressBarProps {
  value: number;
  label?: string;
  accent?: AccentName;
}

export function ProgressBar({ value, label = 'Progress', accent }: ProgressBarProps) {
  const percentage = Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;
  return <div className="ui-progress" data-ui-accent={accent}>
    <div className="ui-progress-heading"><span>{label}</span><span>{Math.round(percentage)}%</span></div>
    <div className="ui-progress-track" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}>
      <div className="ui-progress-fill" style={{ width: `${percentage}%` }} />
    </div>
  </div>;
}
