import * as React from 'react';
import type { AccentName } from '@ui-library/tokens';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: string;
  tone?: 'accent' | 'neutral' | 'success' | 'danger';
  accent?: AccentName;
}

export function Badge({ children, tone = 'accent', accent, className, ...props }: BadgeProps) {
  const classes = ['ui-badge', className].filter(Boolean).join(' ');
  return <span className={classes} data-tone={tone} data-ui-accent={accent} {...props}>{children}</span>;
}
