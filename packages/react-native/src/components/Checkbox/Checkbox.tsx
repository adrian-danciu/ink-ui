import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { tokens, type AccentName } from '@adrian-danciu/ink-ui-tokens';
import { useTheme, useAccent, useMotion, blackWeight, boldWeight } from '../../theme';

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  accent?: AccentName;
  motion?: boolean;
}

export function Checkbox({ label, checked, onCheckedChange, disabled, accent, motion }: CheckboxProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const motionEnabled = useMotion(motion);
  const progress = React.useRef(new Animated.Value(checked ? 1 : 0)).current;
  React.useEffect(() => {
    progress.stopAnimation();
    Animated.timing(progress, { toValue: checked ? 1 : 0, duration: motionEnabled ? tokens.motionDuration.fast : 0, useNativeDriver: true }).start();
    return () => progress.stopAnimation();
  }, [checked, motionEnabled, progress]);
  return <Pressable
    accessibilityRole="checkbox"
    accessibilityLabel={label}
    accessibilityState={{ checked, disabled: !!disabled }}
    disabled={disabled}
    onPress={() => onCheckedChange(!checked)}
    style={{ alignItems: 'center', flexDirection: 'row', gap: tokens.space[2], minHeight: tokens.componentSize.md, opacity: disabled ? tokens.opacity.disabled : tokens.opacity.default }}
  >
    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: checked ? selectedAccent.base : colors.surface, borderColor: colors.border, borderWidth: tokens.borderWidth.md, borderRadius: tokens.radius.sm, height: tokens.controlSize.checkbox, width: tokens.controlSize.checkbox }}>
      <Animated.Text style={{ color: selectedAccent.on, fontSize: tokens.fontSize.md, fontWeight: blackWeight, opacity: progress, transform: [{ scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] }) }] }}>✓</Animated.Text>
    </View>
    <Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: boldWeight }}>{label}</Text>
  </Pressable>;
}

