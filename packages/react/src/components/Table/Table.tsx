import * as React from 'react';

export interface TableColumn { key: string; label: string; align?: 'left' | 'right' }
export interface TableRow { id: string; cells: Record<string, string | number> }
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  columns: readonly TableColumn[];
  rows: readonly TableRow[];
  caption?: string;
}

export function Table({ columns, rows, caption, className, ...props }: TableProps) {
  return <div className="ui-table-scroll">
    <table className={['ui-table', className].filter(Boolean).join(' ')} {...props}>
      {caption && <caption>{caption}</caption>}
      <thead><tr>{columns.map(column => <th key={column.key} scope="col" data-align={column.align ?? 'left'}>{column.label}</th>)}</tr></thead>
      <tbody>{rows.map(row => <tr key={row.id}>{columns.map(column => <td key={column.key} data-align={column.align ?? 'left'}>{row.cells[column.key] ?? '—'}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}
