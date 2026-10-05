import * as React from 'react';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
  errorText?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, helperText, errorText, id, className, required, rows = 4, ...props },
  ref,
) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const message = errorText ?? helperText;
  const messageId = message ? `${inputId}-message` : undefined;
  return <div className="ui-field">
    <label className="ui-field-label" htmlFor={inputId}>{label}{required && <span aria-hidden="true"> *</span>}</label>
    <textarea ref={ref} id={inputId} className={['ui-input', 'ui-textarea', className].filter(Boolean).join(' ')} required={required} rows={rows} aria-invalid={!!errorText || undefined} aria-describedby={messageId} {...props} />
    {message && <span id={messageId} className="ui-field-message" data-error={!!errorText}>{message}</span>}
  </div>;
});
