export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: readonly BreadcrumbItem[];
  label?: string;
}

export function Breadcrumbs({ items, label = 'Breadcrumb' }: BreadcrumbsProps) {
  return <nav className="ui-breadcrumbs" aria-label={label}><ol>
    {items.map((item, index) => <li key={`${item.href ?? item.label}-${index}`}>
      {index > 0 && <span className="ui-breadcrumbs-divider" aria-hidden="true">/</span>}
      {index === items.length - 1 || !item.href ? <span aria-current={index === items.length - 1 ? 'page' : undefined}>{item.label}</span> : <a href={item.href}>{item.label}</a>}
    </li>)}
  </ol></nav>;
}
