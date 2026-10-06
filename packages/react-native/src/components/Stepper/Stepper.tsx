import { Text, View } from 'react-native';
import { tokens, type AccentName } from '@adrian-danciu/ink-ui-tokens';
import { blackWeight, useAccent, useTheme } from '../../theme';

export interface StepperStep { label: string; description?: string }
export interface StepperProps {
  steps: readonly StepperStep[];
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  accent?: AccentName;
}

export function Stepper({ steps, activeStep, orientation = 'horizontal', accent }: StepperProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  return <View style={{ flexDirection: orientation === 'vertical' ? 'column' : 'row', gap: orientation === 'vertical' ? tokens.space[4] : tokens.space[2] }}>
    {steps.map((step, index) => {
      const current = index === activeStep;
      const complete = index < activeStep;
      return <View key={index} accessible accessibilityLabel={`${step.label}, ${complete ? 'complete' : current ? 'current step' : 'upcoming'}`} style={{ alignItems: 'flex-start', flex: orientation === 'horizontal' ? 1 : undefined, flexDirection: 'row', gap: tokens.space[2], opacity: index > activeStep ? tokens.opacity.disabled : tokens.opacity.default }}>
        <View style={{ alignItems: 'center', backgroundColor: current ? selectedAccent.base : complete ? colors.surfaceRaised : colors.surface, borderColor: colors.border, borderRadius: tokens.radius.sm, borderWidth: tokens.borderWidth.md, height: tokens.componentSize.sm, justifyContent: 'center', width: tokens.componentSize.sm }}><Text style={{ color: current ? selectedAccent.on : colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight }}>{complete ? '✓' : index + 1}</Text></View>
        <View style={{ flex: 1, gap: tokens.space[1], paddingTop: tokens.space[2] }}><Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight }}>{step.label}</Text>{step.description && <Text style={{ color: colors.textMuted, fontSize: tokens.fontSize.xs }}>{step.description}</Text>}</View>
      </View>;
    })}
  </View>;
}
