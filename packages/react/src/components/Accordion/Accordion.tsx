import * as React from 'react';
import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface AccordionProps {
  items: readonly { title: string; value: string; content: React.ReactNode }[];
  value: string | null;
  onValueChange: (value: string | null) => void;
  accent?: AccentName;
}

export function Accordion({ items, value, onValueChange, accent }: AccordionProps) {
  const id = React.useId();
  return <div className="ui-accordion" data-ui-accent={accent}>
    {items.map((item, index) => {
      const open = value === item.value;
      return <div className="ui-accordion-item" key={item.value}>
        <h3 className="ui-accordion-heading"><button type="button" id={`${id}-trigger-${index}`} aria-expanded={open} aria-controls={`${id}-content-${index}`} onClick={() => onValueChange(open ? null : item.value)} className="ui-accordion-trigger"><span>{item.title}</span><span aria-hidden="true">{open ? '−' : '+'}</span></button></h3>
        <div id={`${id}-content-${index}`} role="region" aria-labelledby={`${id}-trigger-${index}`} hidden={!open} className="ui-accordion-content">{item.content}</div>
      </div>;
    })}
  </div>;
}
