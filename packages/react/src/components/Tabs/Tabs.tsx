import * as React from 'react';
import type { AccentName } from '@ui-library/tokens';

export interface TabsProps {
  label: string;
  tabs: readonly { label: string; value: string; content: React.ReactNode }[];
  value: string;
  onValueChange: (value: string) => void;
  accent?: AccentName;
}

export function Tabs({ label, tabs, value, onValueChange, accent }: TabsProps) {
  const id = React.useId();
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const selectedIndex = tabs.findIndex(tab => tab.value === value);
  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    refs.current[next]?.focus();
    onValueChange(tabs[next].value);
  }
  return <div className="ui-tabs" data-ui-accent={accent}>
    <div className="ui-tab-list" role="tablist" aria-label={label}>
      {tabs.map((tab, index) => <button
        key={tab.value}
        ref={node => { refs.current[index] = node; }}
        type="button"
        role="tab"
        id={`${id}-tab-${index}`}
        aria-controls={`${id}-panel-${index}`}
        aria-selected={index === selectedIndex}
        tabIndex={index === (selectedIndex < 0 ? 0 : selectedIndex) ? 0 : -1}
        onClick={() => onValueChange(tab.value)}
        onKeyDown={event => onKeyDown(event, index)}
        className="ui-tab"
      >{tab.label}</button>)}
    </div>
    {tabs.map((tab, index) => <div key={tab.value} id={`${id}-panel-${index}`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} hidden={index !== selectedIndex} className="ui-tab-panel">{tab.content}</div>)}
  </div>;
}
