import { Pressable, Text, View } from 'react-native';
import { tokens, type AccentName } from '@adrian-danciu/ink-ui-tokens';
import { blackWeight, useAccent, useTheme } from '../../theme';

export interface ChipProps {
  label: string;
  variant?: 'filled' | 'outlined';
  selected?: boolean;
  disabled?: boolean;
  accent?: AccentName;
  onPress?: () => void;
  onRemove?: () => void;
}

export function Chip({ label, variant = 'filled', selected = false, disabled = false, accent, onPress, onRemove }: ChipProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const filled = variant === 'filled' || selected;
  const color = filled ? selectedAccent.on : colors.text;
  return <View style={{ alignSelf: 'flex-start', alignItems: 'center', backgroundColor: filled ? selectedAccent.base : colors.surface, borderColor: colors.border, borderRadius: tokens.radius.sm, borderWidth: tokens.borderWidth.md, flexDirection: 'row', minHeight: tokens.componentSize.md, opacity: disabled ? tokens.opacity.disabled : tokens.opacity.default }}>
    {onPress ? <Pressable accessibilityRole="button" accessibilityState={{ selected, disabled }} disabled={disabled} onPress={onPress} style={{ justifyContent: 'center', minHeight: tokens.componentSize.md, paddingHorizontal: tokens.space[3] }}><Text style={{ color, fontSize: tokens.fontSize.xs, fontWeight: blackWeight, textTransform: 'uppercase' }}>{label}</Text></Pressable> : <Text style={{ color, fontSize: tokens.fontSize.xs, fontWeight: blackWeight, paddingHorizontal: tokens.space[3], textTransform: 'uppercase' }}>{label}</Text>}
    {onRemove && <Pressable accessibilityRole="button" accessibilityLabel={`Remove ${label}`} accessibilityState={{ disabled }} disabled={disabled} onPress={onRemove} style={{ alignItems: 'center', borderLeftColor: colors.border, borderLeftWidth: tokens.borderWidth.sm, justifyContent: 'center', minHeight: tokens.componentSize.md, minWidth: tokens.componentSize.md }}><Text style={{ color, fontSize: tokens.fontSize.md, fontWeight: blackWeight }}>×</Text></Pressable>}
  </View>;
}
