import { Text, TextInput, View, StyleProp, type TextInputProps, type TextStyle } from 'react-native';
import { tokens } from '@ui-library/tokens';
import { useTheme, blackWeight } from '../../theme';

export interface TextAreaProps extends Omit<TextInputProps, 'style' | 'multiline'> {
  label: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
}

export function TextArea({ label, helperText, errorText, disabled, style, editable = true, accessibilityLabel, placeholderTextColor, ...props }: TextAreaProps) {
  const colors = useTheme();
  const message = errorText ?? helperText;
  return <View style={{ gap: tokens.space[2] }}>
    <Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: blackWeight, letterSpacing: tokens.letterSpacing.wide, textTransform: 'uppercase' }}>{label}</Text>
    <TextInput
      {...props}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityHint={message}
      accessibilityState={{ disabled: !!disabled }}
      editable={!disabled && editable}
      multiline
      placeholderTextColor={placeholderTextColor ?? colors.textMuted}
      textAlignVertical="top"
      style={[{ backgroundColor: colors.surface, borderColor: errorText ? colors.danger : colors.border, borderWidth: tokens.borderWidth.md, borderRadius: tokens.radius.sm, color: colors.text, fontSize: tokens.fontSize.md, lineHeight: tokens.lineHeight.body, minHeight: tokens.controlSize.textareaHeight, opacity: disabled ? tokens.opacity.disabled : tokens.opacity.default, padding: tokens.space[3] }, style]}
    />
    {message && <Text style={{ color: errorText ? colors.danger : colors.textMuted, fontSize: tokens.fontSize.xs, lineHeight: tokens.lineHeight.caption }}>{message}</Text>}
  </View>;
}

