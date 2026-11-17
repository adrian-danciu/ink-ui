import * as React from 'react';
import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  accent?: AccentName;
  motion?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, icon, size = 'md', variant = 'secondary', accent, motion, className, type = 'button', ...props },
  ref,
) {
  return <button ref={ref} type={type} aria-label={label} title={label} className={['ui-icon-button', className].filter(Boolean).join(' ')} data-size={size} data-variant={variant} data-ui-accent={accent} data-ui-motion={motion === undefined ? undefined : motion ? 'on' : 'off'} {...props}><span aria-hidden="true">{icon}</span></button>;
});
