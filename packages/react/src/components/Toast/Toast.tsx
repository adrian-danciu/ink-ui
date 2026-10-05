export interface ToastProps {
  open: boolean;
  title: string;
  description?: string;
  tone?: 'info' | 'success' | 'warning' | 'danger';
  onDismiss: () => void;
}

export function Toast({ open, title, description, tone = 'info', onDismiss }: ToastProps) {
  if (!open) return null;
  const accent = tone === 'warning' ? 'yellow' : tone === 'info' ? 'turquoise' : undefined;
  return <div className="ui-toast" data-tone={tone} data-ui-accent={accent} role={tone === 'danger' ? 'alert' : 'status'}>
    <div className="ui-toast-copy"><strong className="ui-toast-title">{title}</strong>{description && <span className="ui-toast-description">{description}</span>}</div>
    <button className="ui-toast-close" type="button" aria-label="Dismiss notification" onClick={onDismiss}>×</button>
  </div>;
}
