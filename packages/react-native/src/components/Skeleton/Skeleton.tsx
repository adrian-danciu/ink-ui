import { View } from 'react-native';
import { tokens } from '@adrian-danciu/ink-ui-tokens';
import { useTheme } from '../../theme';

export interface SkeletonProps {
  variant?: 'text' | 'block' | 'circle';
  width?: number | `${number}%`;
  height?: number;
}

export function Skeleton({ variant = 'text', width, height }: SkeletonProps) {
  const colors = useTheme();
  return <View accessible={false} importantForAccessibility="no-hide-descendants" style={{ backgroundColor: colors.surfaceRaised, borderColor: colors.border, borderRadius: variant === 'circle' ? tokens.radius.full : tokens.radius.sm, borderWidth: tokens.borderWidth.sm, height: height ?? (variant === 'circle' ? tokens.componentSize.md : variant === 'block' ? tokens.componentSize.lg : tokens.lineHeight.body), maxWidth: '100%', width: width ?? (variant === 'circle' ? tokens.componentSize.md : '100%') }} />;
}
