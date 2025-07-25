import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    };

    // Size styles
    switch (size) {
      case 'small':
        baseStyle.paddingHorizontal = SPACING.md;
        baseStyle.paddingVertical = SPACING.sm;
        break;
      case 'large':
        baseStyle.paddingHorizontal = SPACING.xl;
        baseStyle.paddingVertical = SPACING.md + 4;
        break;
      default:
        baseStyle.paddingHorizontal = SPACING.lg;
        baseStyle.paddingVertical = SPACING.md;
    }

    // Variant styles
    switch (variant) {
      case 'secondary':
        baseStyle.backgroundColor = COLORS.secondary;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = COLORS.primary;
        break;
      case 'text':
        baseStyle.backgroundColor = 'transparent';
        break;
      default:
        baseStyle.backgroundColor = COLORS.primary;
        baseStyle.elevation = 2;
        Object.assign(baseStyle, SHADOWS.small);
    }

    // Disabled state
    if (disabled) {
      baseStyle.backgroundColor = COLORS.textLight;
      baseStyle.elevation = 0;
      delete baseStyle.shadowColor;
      delete baseStyle.shadowOffset;
      delete baseStyle.shadowOpacity;
      delete baseStyle.shadowRadius;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      ...TYPOGRAPHY.button,
    };

    // Size styles
    switch (size) {
      case 'small':
        baseTextStyle.fontSize = 14;
        break;
      case 'large':
        baseTextStyle.fontSize = 18;
        break;
    }

    // Variant styles
    switch (variant) {
      case 'outline':
        baseTextStyle.color = disabled ? COLORS.textLight : COLORS.primary;
        break;
      case 'text':
        baseTextStyle.color = disabled ? COLORS.textLight : COLORS.primary;
        break;
      default:
        baseTextStyle.color = disabled ? COLORS.textSecondary : COLORS.surface;
    }

    return baseTextStyle;
  };

  const getRippleColor = (): string => {
    if (disabled) return 'transparent';
    
    switch (variant) {
      case 'secondary':
        return COLORS.secondaryDark;
      case 'outline':
      case 'text':
        return COLORS.primaryLight;
      default:
        return COLORS.primaryDark;
    }
  };

  return (
    <Pressable
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      android_ripple={{ color: getRippleColor() }}
    >
      <Text style={[getTextStyle(), textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
};
