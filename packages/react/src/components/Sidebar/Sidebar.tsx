import * as React from 'react';

export interface SidebarLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
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
  iconPosition?: 'left' | 'right';
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  onNavigate?: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export function Sidebar({ groups, currentPath, label = 'Sidebar navigation', header, footer, iconPosition = 'left', collapsible = false, collapsed, defaultCollapsed = false, onCollapsedChange, mobileOpen, onMobileOpenChange, onNavigate, className, ...props }: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = React.useState(defaultCollapsed);
  const [isMobile, setIsMobile] = React.useState(() => typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(max-width: 767px)').matches);
  const isCollapsed = collapsed ?? internalCollapsed;
  const drawer = mobileOpen !== undefined;
  const mobileDrawerOpen = drawer && mobileOpen === true && isMobile;
  const panelRef = React.useRef<HTMLElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  function toggleCollapsed() {
    const next = !isCollapsed;
    if (collapsed === undefined) setInternalCollapsed(next);
    onCollapsedChange?.(next);
  }

  React.useEffect(() => {
    if (!mobileDrawerOpen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onMobileOpenChange?.(false);
      if (event.key !== 'Tab' || !panelRef.current) return;
      const controls = Array.from(panelRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]')).filter(control => control.getClientRects().length > 0);
      if (!controls.length) return;
      if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls[controls.length - 1].focus(); }
      else if (!event.shiftKey && document.activeElement === controls[controls.length - 1]) { event.preventDefault(); controls[0].focus(); }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, [mobileDrawerOpen, onMobileOpenChange]);

  return <>
    {drawer && <button type="button" className="ui-sidebar-backdrop" data-open={mobileDrawerOpen} aria-label="Close navigation" tabIndex={mobileDrawerOpen ? 0 : -1} onClick={() => onMobileOpenChange?.(false)} />}
    <aside {...props} ref={panelRef} role={mobileDrawerOpen ? 'dialog' : props.role} aria-modal={mobileDrawerOpen ? true : props['aria-modal']} aria-label={mobileDrawerOpen ? label : props['aria-label']} className={['ui-sidebar', className].filter(Boolean).join(' ')} data-collapsed={collapsible && isCollapsed} data-mobile-drawer={drawer} data-mobile-open={mobileOpen}>
      {(collapsible || drawer) && <div className="ui-sidebar-actions">
        {collapsible && <button type="button" className="ui-sidebar-collapse" aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} aria-expanded={!isCollapsed} onClick={toggleCollapsed}><span aria-hidden="true">{isCollapsed ? '→' : '←'}</span></button>}
        {drawer && <button ref={closeRef} type="button" className="ui-sidebar-mobile-close" aria-label="Close navigation" onClick={() => onMobileOpenChange?.(false)}>×</button>}
      </div>}
      {header && <div className="ui-sidebar-header">{header}</div>}
      <nav aria-label={label} className="ui-sidebar-nav">
        {groups.map(group => <div className="ui-sidebar-group" key={group.title}>
          <h2 className="ui-sidebar-group-title">{group.title}</h2>
          <ul className="ui-sidebar-list">
            {group.links.map(link => <li key={link.href}>
              <a className="ui-sidebar-link" href={link.href} aria-current={currentPath === link.href ? 'page' : undefined} data-icon-position={link.iconPosition ?? iconPosition} title={collapsible && isCollapsed ? link.label : undefined} onClick={event => { onNavigate?.(event, link.href); if (mobileDrawerOpen) onMobileOpenChange?.(false); }}>
                {link.icon && <span className="ui-sidebar-link-icon" aria-hidden="true">{link.icon}</span>}
                <span className="ui-sidebar-link-label">{link.label}</span>
                {!link.icon && <span className="ui-sidebar-link-fallback" aria-hidden="true">{link.label.charAt(0).toUpperCase()}</span>}
              </a>
            </li>)}
          </ul>
        </div>)}
      </nav>
      {footer && <div className="ui-sidebar-footer">{footer}</div>}
    </aside>
  </>;
}
