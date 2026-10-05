import * as React from 'react';
import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string;
  eyebrow?: string;
  description?: string;
  accent?: AccentName;
  children?: React.ReactNode;
}

export function Card({ title, eyebrow, description, accent, children, className, ...props }: CardProps) {
  const classes = ['ui-card', className].filter(Boolean).join(' ');
  return <div className={classes} data-ui-accent={accent} {...props}>
    <div className="ui-card-stripe" aria-hidden="true" />
    {eyebrow && <span className="ui-card-eyebrow">{eyebrow}</span>}
    <h3 className="ui-card-title">{title}</h3>
    {description && <p className="ui-card-description">{description}</p>}
    {children && <div className="ui-card-content">{children}</div>}
  </div>;
}
