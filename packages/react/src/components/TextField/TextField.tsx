import * as React from 'react';

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  helperText?: string;
  errorText?: string;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, helperText, errorText, id, className, required, ...props },
  ref,
) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const message = errorText ?? helperText;
  const messageId = message ? `${inputId}-message` : undefined;
  const classes = ['ui-input', className].filter(Boolean).join(' ');
  return <div className="ui-field">
    <label className="ui-field-label" htmlFor={inputId}>{label}{required && <span aria-hidden="true"> *</span>}</label>
    <input ref={ref} id={inputId} className={classes} required={required} aria-invalid={!!errorText || undefined} aria-describedby={messageId} {...props} />
    {message && <span id={messageId} className="ui-field-message" data-error={!!errorText}>{message}</span>}
  </div>;
});
