import { ActivityIndicator, View } from 'react-native';
import { tokens, type AccentName } from '@adrian-danciu/ink-ui-tokens';
import { useAccent, useTheme } from '../../theme';

export interface SpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  accent?: AccentName;
}

export function Spinner({ label = 'Loading', size = 'md', accent }: SpinnerProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  return <View accessible accessibilityRole="progressbar" accessibilityLabel={label} style={{ alignItems: 'center', borderColor: colors.border, borderRadius: tokens.radius.full, borderWidth: tokens.borderWidth.md, height: tokens.componentSize[size], justifyContent: 'center', width: tokens.componentSize[size] }}>
    <ActivityIndicator color={selectedAccent.base} size={size === 'sm' ? 'small' : 'large'} />
  </View>;
}
