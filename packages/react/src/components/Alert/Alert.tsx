export interface AlertProps {
  title: string;
  description?: string;
  tone?: 'info' | 'success' | 'warning' | 'danger';
}

export function Alert({ title, description, tone = 'info' }: AlertProps) {
  const accent = tone === 'warning' ? 'yellow' : tone === 'info' ? 'turquoise' : undefined;
  return <div className="ui-alert" data-tone={tone} data-ui-accent={accent} role={tone === 'danger' ? 'alert' : 'status'}>
    <strong className="ui-alert-title">{title}</strong>
    {description && <span className="ui-alert-description">{description}</span>}
  </div>;
}
