import * as React from 'react';
import { Text, TextInput, View, StyleProp, type TextInputProps, type TextStyle } from 'react-native';
import { tokens } from '@ui-library/tokens';
import { useTheme, blackWeight } from '../../theme';

export interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  label: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
}

export function TextField({ label, helperText, errorText, disabled, style, editable = true, accessibilityLabel, onFocus, onBlur, placeholderTextColor, ...props }: TextFieldProps) {
  const colors = useTheme();
  const [focused, setFocused] = React.useState(false);
  const message = errorText ?? helperText;
  return <View style={{ gap: tokens.space[2] }}>
    <Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight, letterSpacing: tokens.letterSpacing.wide, textTransform: 'uppercase' }}>{label}</Text>
    <TextInput
      {...props}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityHint={message}
      accessibilityState={{ disabled: !!disabled }}
      editable={!disabled && editable}
      placeholderTextColor={placeholderTextColor ?? colors.textMuted}
      onFocus={event => { setFocused(true); onFocus?.(event); }}
      onBlur={event => { setFocused(false); onBlur?.(event); }}
      style={[
        { backgroundColor: colors.surface, borderColor: errorText ? colors.danger : focused ? colors.focus : colors.border, borderWidth: tokens.borderWidth.md, borderRadius: tokens.radius.sm, color: colors.text, fontSize: tokens.fontSize.md, minHeight: tokens.componentSize.md, paddingHorizontal: tokens.space[3], opacity: disabled ? tokens.opacity.disabled : tokens.opacity.default },
        style,
      ]}
    />
    {message && <Text style={{ color: errorText ? colors.danger : colors.textMuted, fontSize: tokens.fontSize.xs, lineHeight: tokens.lineHeight.caption }}>{message}</Text>}
  </View>;
}

