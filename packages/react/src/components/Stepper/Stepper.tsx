import * as React from 'react';
import type { AccentName } from '@adrian-danciu/ink-ui-tokens';

export interface StepperStep { label: string; description?: string }
export interface StepperProps extends React.OlHTMLAttributes<HTMLOListElement> {
  steps: readonly StepperStep[];
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  accent?: AccentName;
}

export function Stepper({ steps, activeStep, orientation = 'horizontal', accent, className, ...props }: StepperProps) {
  return <ol className={['ui-stepper', className].filter(Boolean).join(' ')} data-orientation={orientation} data-ui-accent={accent} {...props}>
    {steps.map((step, index) => <li key={index} data-state={index < activeStep ? 'complete' : index === activeStep ? 'current' : 'upcoming'} aria-current={index === activeStep ? 'step' : undefined}>
      <span className="ui-stepper-mark" aria-hidden="true">{index < activeStep ? '✓' : index + 1}</span>
      <span className="ui-stepper-copy"><strong>{step.label}</strong>{step.description && <span>{step.description}</span>}</span>
    </li>)}
  </ol>;
}
