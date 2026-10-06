import { Pressable, Text, View } from 'react-native';
import { tokens, type AccentName } from '@adrian-danciu/ink-ui-tokens';
import { blackWeight, useAccent, useTheme } from '../../theme';

export interface RatingProps {
  label: string;
  value: number;
  onValueChange?: (value: number) => void;
  max?: number;
  disabled?: boolean;
  accent?: AccentName;
}

export function Rating({ label, value, onValueChange, max = 5, disabled = false, accent }: RatingProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const count = Math.max(1, Math.min(10, Math.floor(max) || 5));
  const selected = Math.max(0, Math.min(count, Math.floor(value) || 0));
  return <View style={{ gap: tokens.space[2], opacity: disabled ? tokens.opacity.disabled : tokens.opacity.default }}>
    <Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight }}>{label}</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.space[1] }}>
      {Array.from({ length: count }, (_, index) => <Pressable key={index} accessibilityRole="radio" accessibilityLabel={`${index + 1} of ${count}`} accessibilityState={{ checked: selected === index + 1, disabled: disabled || !onValueChange }} disabled={disabled || !onValueChange} onPress={() => onValueChange?.(index + 1)} style={{ alignItems: 'center', backgroundColor: index < selected ? selectedAccent.base : colors.surface, borderColor: colors.border, borderRadius: tokens.radius.sm, borderWidth: tokens.borderWidth.md, height: tokens.componentSize.md, justifyContent: 'center', width: tokens.componentSize.md }}><Text style={{ color: index < selected ? selectedAccent.on : colors.textMuted, fontSize: tokens.fontSize.lg }}>★</Text></Pressable>)}
    </View>
  </View>;
}
