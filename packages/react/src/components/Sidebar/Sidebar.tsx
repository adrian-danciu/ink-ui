import * as React from 'react';

export interface SidebarLink {
  label: string;
  href: string;
}

export interface SidebarGroup {
  title: string;
  links: readonly SidebarLink[];
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  groups: readonly SidebarGroup[];
  currentPath?: string;
  label?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onNavigate?: () => void;
}

export function Sidebar({ groups, currentPath, label = 'Sidebar navigation', header, footer, onNavigate, className, ...props }: SidebarProps) {
  return <aside className={['ui-sidebar', className].filter(Boolean).join(' ')} {...props}>
    {header && <div className="ui-sidebar-header">{header}</div>}
    <nav aria-label={label} className="ui-sidebar-nav">
      {groups.map(group => <div className="ui-sidebar-group" key={group.title}>
        <h2 className="ui-sidebar-group-title">{group.title}</h2>
        <ul className="ui-sidebar-list">
          {group.links.map(link => <li key={link.href}>
            <a className="ui-sidebar-link" href={link.href} aria-current={currentPath === link.href ? 'page' : undefined} onClick={onNavigate}>{link.label}</a>
          </li>)}
        </ul>
      </div>)}
    </nav>
    {footer && <div className="ui-sidebar-footer">{footer}</div>}
  </aside>;
}
