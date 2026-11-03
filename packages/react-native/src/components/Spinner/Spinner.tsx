import { ActivityIndicator, View } from 'react-native';
import { tokens, type AccentName } from '@adrian-danciu/ink-ui-tokens';
import { useAccent, useMotion, useTheme } from '../../theme';

export interface SpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  accent?: AccentName;
  motion?: boolean;
}

export function Spinner({ label = 'Loading', size = 'md', accent, motion }: SpinnerProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const motionEnabled = useMotion(motion);
  return <View accessible accessibilityRole="progressbar" accessibilityLabel={label} style={{ alignItems: 'center', borderColor: colors.border, borderRadius: tokens.radius.full, borderWidth: tokens.borderWidth.md, height: tokens.componentSize[size], justifyContent: 'center', width: tokens.componentSize[size] }}>
    <ActivityIndicator animating={motionEnabled} hidesWhenStopped={false} color={selectedAccent.base} size={size === 'sm' ? 'small' : 'large'} />
  </View>;
}
