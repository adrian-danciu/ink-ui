import { Pressable, Text, View } from 'react-native';
import { tokens, type AccentName } from '@adrian-danciu/ink-ui-tokens';
import { useTheme, useAccent, blackWeight, boldWeight } from '../../theme';

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  accent?: AccentName;
}

export function Checkbox({ label, checked, onCheckedChange, disabled, accent }: CheckboxProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  return <Pressable
    accessibilityRole="checkbox"
    accessibilityLabel={label}
    accessibilityState={{ checked, disabled: !!disabled }}
    disabled={disabled}
    onPress={() => onCheckedChange(!checked)}
    style={{ alignItems: 'center', flexDirection: 'row', gap: tokens.space[2], minHeight: tokens.componentSize.md, opacity: disabled ? tokens.opacity.disabled : tokens.opacity.default }}
  >
    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: checked ? selectedAccent.base : colors.surface, borderColor: colors.border, borderWidth: tokens.borderWidth.md, borderRadius: tokens.radius.sm, height: tokens.controlSize.checkbox, width: tokens.controlSize.checkbox }}>
      {checked && <Text style={{ color: selectedAccent.on, fontSize: tokens.fontSize.md, fontWeight: blackWeight }}>✓</Text>}
    </View>
    <Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: boldWeight }}>{label}</Text>
  </Pressable>;
}

