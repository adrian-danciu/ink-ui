import { Pressable, Text, View } from 'react-native';
import { tokens, type AccentName } from '@adrian-danciu/ink-ui-tokens';
import { useTheme, useAccent, boldWeight } from '../../theme';

export interface SwitchProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  accent?: AccentName;
}

export function Switch({ label, checked, onCheckedChange, disabled, accent }: SwitchProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const thumbTravel = tokens.controlSize.switchWidth - tokens.controlSize.switchThumb - tokens.space[2] - tokens.borderWidth.md * 2;
  return <Pressable
    accessibilityRole="switch"
    accessibilityLabel={label}
    accessibilityState={{ checked, disabled: !!disabled }}
    disabled={disabled}
    onPress={() => onCheckedChange(!checked)}
    style={{ alignItems: 'center', flexDirection: 'row', gap: tokens.space[3], minHeight: tokens.componentSize.md, opacity: disabled ? tokens.opacity.disabled : tokens.opacity.default }}
  >
    <View style={{ alignItems: 'center', backgroundColor: checked ? selectedAccent.base : colors.surface, borderColor: colors.border, borderRadius: tokens.radius.sm, borderWidth: tokens.borderWidth.md, flexDirection: 'row', height: tokens.controlSize.switchHeight, width: tokens.controlSize.switchWidth }}>
      <View style={{ backgroundColor: checked ? selectedAccent.on : colors.text, height: tokens.controlSize.switchThumb, marginLeft: tokens.space[1], transform: [{ translateX: checked ? thumbTravel : 0 }], width: tokens.controlSize.switchThumb }} />
    </View>
    <Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: boldWeight }}>{label}</Text>
  </Pressable>;
}

