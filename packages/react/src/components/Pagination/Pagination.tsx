import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface PaginationProps {
  page: number;
  count: number;
  onPageChange: (page: number) => void;
  label?: string;
  accent?: AccentName;
}

function pageItems(page: number, count: number) {
  const pages = [...new Set([1, count, page - 1, page, page + 1].filter(value => value >= 1 && value <= count))].sort((a, b) => a - b);
  return pages.flatMap((value, index) => index && value - pages[index - 1] > 1 ? [null, value] : [value]);
}

export function Pagination({ page, count, onPageChange, label = 'Pagination', accent }: PaginationProps) {
  const total = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;
  if (!total) return null;
  const current = Number.isFinite(page) ? Math.min(total, Math.max(1, Math.floor(page))) : 1;
  return <nav className="ui-pagination" aria-label={label} data-ui-accent={accent}>
    <button type="button" aria-label="Previous page" disabled={current === 1} onClick={() => onPageChange(current - 1)}>‹</button>
    {pageItems(current, total).map((item, index) => item === null ? <span key={`gap-${index}`} aria-hidden="true">…</span> : <button key={item} type="button" aria-label={`Page ${item}`} aria-current={item === current ? 'page' : undefined} onClick={() => onPageChange(item)}>{item}</button>)}
    <button type="button" aria-label="Next page" disabled={current === total} onClick={() => onPageChange(current + 1)}>›</button>
  </nav>;
}
