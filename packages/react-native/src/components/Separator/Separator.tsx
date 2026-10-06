import { View } from 'react-native';
import { tokens } from '@adrian-danciu/ink-ui-tokens';
import { useTheme } from '../../theme';

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
}

export function Separator({ orientation = 'horizontal' }: SeparatorProps) {
  const colors = useTheme();
  return <View accessible={false} style={orientation === 'horizontal'
    ? { alignSelf: 'stretch', backgroundColor: colors.border, height: tokens.borderWidth.sm }
    : { alignSelf: 'stretch', backgroundColor: colors.border, minHeight: tokens.componentSize.sm, width: tokens.borderWidth.sm }} />;
}
