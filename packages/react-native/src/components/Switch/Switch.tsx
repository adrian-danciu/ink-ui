import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { tokens, type AccentName } from '@adrian-danciu/ink-ui-tokens';
import { useTheme, useAccent, useMotion, boldWeight } from '../../theme';

export interface SwitchProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  accent?: AccentName;
  motion?: boolean;
}

export function Switch({ label, checked, onCheckedChange, disabled, accent, motion }: SwitchProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const motionEnabled = useMotion(motion);
  const thumbTravel = tokens.controlSize.switchWidth - tokens.controlSize.switchThumb - tokens.space[2] - tokens.borderWidth.md * 2;
  const progress = React.useRef(new Animated.Value(checked ? 1 : 0)).current;
  React.useEffect(() => {
    progress.stopAnimation();
    Animated.timing(progress, { toValue: checked ? 1 : 0, duration: motionEnabled ? tokens.motionDuration.fast : 0, useNativeDriver: true }).start();
    return () => progress.stopAnimation();
  }, [checked, motionEnabled, progress]);
  return <Pressable
    accessibilityRole="switch"
    accessibilityLabel={label}
    accessibilityState={{ checked, disabled: !!disabled }}
    disabled={disabled}
    onPress={() => onCheckedChange(!checked)}
    style={{ alignItems: 'center', flexDirection: 'row', gap: tokens.space[3], minHeight: tokens.componentSize.md, opacity: disabled ? tokens.opacity.disabled : tokens.opacity.default }}
  >
    <View style={{ alignItems: 'center', backgroundColor: checked ? selectedAccent.base : colors.surface, borderColor: colors.border, borderRadius: tokens.radius.sm, borderWidth: tokens.borderWidth.md, flexDirection: 'row', height: tokens.controlSize.switchHeight, width: tokens.controlSize.switchWidth }}>
      <Animated.View style={{ backgroundColor: checked ? selectedAccent.on : colors.text, height: tokens.controlSize.switchThumb, marginLeft: tokens.space[1], transform: [{ translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [0, thumbTravel] }) }], width: tokens.controlSize.switchThumb }} />
    </View>
    <Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: boldWeight }}>{label}</Text>
  </Pressable>;
}

