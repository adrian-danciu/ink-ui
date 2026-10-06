import { Pressable, Text, View } from 'react-native';
import { tokens, type AccentName } from '@adrian-danciu/ink-ui-tokens';
import { blackWeight, useAccent, useTheme } from '../../theme';

export interface ToggleGroupOption { label: string; value: string; disabled?: boolean }
export interface ToggleGroupProps {
  label: string;
  options: readonly ToggleGroupOption[];
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  accent?: AccentName;
}

export function ToggleGroup({ label, options, value, onValueChange, disabled = false, accent }: ToggleGroupProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  return <View accessibilityLabel={label} style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.space[1] }}>
    {options.map(option => {
      const selected = value === option.value;
      const isDisabled = disabled || option.disabled;
      return <Pressable key={option.value} accessibilityRole="button" accessibilityState={{ selected, disabled: isDisabled }} disabled={isDisabled} onPress={() => onValueChange(option.value)} style={{ backgroundColor: selected ? selectedAccent.base : colors.surface, borderColor: colors.border, borderRadius: tokens.radius.sm, borderWidth: tokens.borderWidth.md, justifyContent: 'center', minHeight: tokens.componentSize.md, opacity: isDisabled ? tokens.opacity.disabled : tokens.opacity.default, paddingHorizontal: tokens.space[3], paddingVertical: tokens.space[2] }}>
        <Text style={{ color: selected ? selectedAccent.on : colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight, textTransform: 'uppercase' }}>{option.label}</Text>
      </Pressable>;
    })}
  </View>;
}
