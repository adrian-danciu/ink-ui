import * as React from 'react';
import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  accent?: AccentName;
  motion?: boolean;
}

export function Spinner({ label = 'Loading', size = 'md', accent, motion, className, ...props }: SpinnerProps) {
  return <span role="status" aria-label={label} className={['ui-spinner', className].filter(Boolean).join(' ')} data-size={size} data-ui-accent={accent} data-ui-motion={motion === undefined ? undefined : motion ? 'on' : 'off'} {...props} />;
}
