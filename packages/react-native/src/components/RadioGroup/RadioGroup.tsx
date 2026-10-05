import { Pressable, Text, View } from 'react-native';
import { tokens, type AccentName } from '@ui-library/tokens';
import { useTheme, useAccent, blackWeight, boldWeight } from '../../theme';

export interface RadioGroupProps {
  label: string;
  options: readonly { label: string; value: string }[];
  value: string;
  onValueChange: (value: string) => void;
  name?: string;
  disabled?: boolean;
  accent?: AccentName;
}

export function RadioGroup({ label, options, value, onValueChange, disabled, accent }: RadioGroupProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  return <View style={{ gap: tokens.space[2], opacity: disabled ? tokens.opacity.disabled : tokens.opacity.default }}>
    <Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight, letterSpacing: tokens.letterSpacing.wide, textTransform: 'uppercase' }}>{label}</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.space[3] }}>
      {options.map(option => <Pressable
        key={option.value}
        accessibilityRole="radio"
        accessibilityLabel={option.label}
        accessibilityState={{ selected: value === option.value, disabled: !!disabled }}
        disabled={disabled}
        onPress={() => onValueChange(option.value)}
        style={{ alignItems: 'center', flexDirection: 'row', gap: tokens.space[2], minHeight: tokens.componentSize.md }}
      >
        <View style={{ alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: tokens.radius.full, borderWidth: tokens.borderWidth.md, height: tokens.controlSize.radio, justifyContent: 'center', width: tokens.controlSize.radio }}>
          {value === option.value && <View style={{ backgroundColor: selectedAccent.base, borderRadius: tokens.radius.full, height: tokens.space[3], width: tokens.space[3] }} />}
        </View>
        <Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: boldWeight }}>{option.label}</Text>
      </Pressable>)}
    </View>
  </View>;
}

