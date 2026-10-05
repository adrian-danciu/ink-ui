import * as React from 'react';
import type { AccentName } from '@ui-library/tokens';

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  accent?: AccentName;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, icon, size = 'md', variant = 'secondary', accent, className, type = 'button', ...props },
  ref,
) {
  return <button ref={ref} type={type} aria-label={label} title={label} className={['ui-icon-button', className].filter(Boolean).join(' ')} data-size={size} data-variant={variant} data-ui-accent={accent} {...props}><span aria-hidden="true">{icon}</span></button>;
});
