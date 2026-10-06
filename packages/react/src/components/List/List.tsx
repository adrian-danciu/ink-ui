import * as React from 'react';
import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface ListItem {
  id: string;
  title: string;
  description?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  disabled?: boolean;
}

export interface ListProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onSelect'> {
  items: readonly ListItem[];
  selectedId?: string;
  onItemSelect?: (id: string) => void;
  accent?: AccentName;
}

export function List({ items, selectedId, onItemSelect, accent, className, ...props }: ListProps) {
  return <ul className={['ui-list', className].filter(Boolean).join(' ')} data-ui-accent={accent} {...props}>
    {items.map(item => {
      const content = <>
        {item.leading && <span className="ui-list-leading" aria-hidden="true">{item.leading}</span>}
        <span className="ui-list-copy"><strong>{item.title}</strong>{item.description && <span>{item.description}</span>}</span>
        {item.trailing && <span className="ui-list-trailing" aria-hidden="true">{item.trailing}</span>}
      </>;
      return <li key={item.id} data-selected={selectedId === item.id}>
        {onItemSelect ? <button type="button" disabled={item.disabled} aria-pressed={selectedId === item.id} onClick={() => onItemSelect(item.id)}>{content}</button> : <div className="ui-list-item">{content}</div>}
      </li>;
    })}
  </ul>;
}
