import * as React from 'react';
import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface EmptyStateProps {
  title: string;
  description?: string;
  accent?: AccentName;
  children?: React.ReactNode;
}

export function EmptyState({ title, description, accent, children }: EmptyStateProps) {
  return <div className="ui-empty-state" data-ui-accent={accent}>
    <span className="ui-empty-mark" aria-hidden="true">✳</span>
    <h3 className="ui-empty-title">{title}</h3>
    {description && <p className="ui-empty-description">{description}</p>}
    {children && <div className="ui-empty-action">{children}</div>}
  </div>;
}
