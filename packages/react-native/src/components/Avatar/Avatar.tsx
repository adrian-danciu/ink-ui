import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { tokens, type AccentName } from '@adrian-danciu/ink-ui-tokens';
import { blackWeight, useAccent, useTheme } from '../../theme';

export interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  accent?: AccentName;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts.length > 1 ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase() : (parts[0]?.slice(0, 2) ?? '?').toUpperCase();
}

export function Avatar({ name, src, size = 'md', accent }: AvatarProps) {
  const colors = useTheme();
  const selectedAccent = useAccent(accent);
  const [imageFailed, setImageFailed] = React.useState(false);
  React.useEffect(() => setImageFailed(false), [src]);
  const dimension = tokens.componentSize[size];
  return <View accessible accessibilityRole="image" accessibilityLabel={name} style={{ elevation: tokens.shadowOffset.sm, height: dimension, shadowColor: colors.shadow, shadowOffset: { width: tokens.shadowOffset.sm, height: tokens.shadowOffset.sm }, shadowOpacity: tokens.opacity.default, shadowRadius: tokens.radius.none, width: dimension }}>
    <View style={{ alignItems: 'center', backgroundColor: selectedAccent.base, borderColor: colors.border, borderRadius: tokens.radius.sm, borderWidth: tokens.borderWidth.md, height: dimension, justifyContent: 'center', overflow: 'hidden', width: dimension }}>
      {src && !imageFailed ? <Image source={{ uri: src }} onError={() => setImageFailed(true)} style={{ height: '100%', width: '100%' }} /> : <Text style={{ color: selectedAccent.on, fontSize: size === 'lg' ? tokens.fontSize.lg : size === 'sm' ? tokens.fontSize.xs : tokens.fontSize.sm, fontWeight: blackWeight }}>{initials(name)}</Text>}
    </View>
  </View>;
}
