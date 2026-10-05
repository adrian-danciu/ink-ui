import { Text, View } from 'react-native';
import { tokens, type AccentName } from '@ui-library/tokens';
import { useTheme, useAccent, blackWeight } from '../../theme';

export interface ProgressBarProps {
  value: number;
  label?: string;
  accent?: AccentName;
}

export function ProgressBar({ value, label = 'Progress', accent }: ProgressBarProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const percentage = Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;
  return <View style={{ gap: tokens.space[2] }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight, letterSpacing: tokens.letterSpacing.wide, textTransform: 'uppercase' }}>{label}</Text>
      <Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight }}>{Math.round(percentage)}%</Text>
    </View>
    <View accessibilityRole="progressbar" accessibilityLabel={label} accessibilityValue={{ min: 0, max: 100, now: percentage }} style={{ backgroundColor: colors.surfaceRaised, borderColor: colors.border, borderWidth: tokens.borderWidth.md, height: tokens.controlSize.progress, overflow: 'hidden', width: '100%' }}>
      <View style={{ backgroundColor: selectedAccent.base, height: '100%', width: `${percentage}%` }} />
    </View>
  </View>;
}

