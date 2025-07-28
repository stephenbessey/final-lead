import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, ICON_SIZES, DeviceDetection } from '../constants/theme';

interface ActionButtonsProps {
  onExport: () => void;
  onBack: () => void;
}

interface ResponsiveButtonProps {
  onPress: () => void;
  iconName: string;
  text: string;
  variant: 'primary' | 'secondary';
  rippleColor: string;
}

const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({ 
  onPress, 
  iconName, 
  text, 
  variant, 
  rippleColor 
}) => {
  const isSmallDevice = DeviceDetection.isSmallDevice();
  const iconSize = isSmallDevice ? ICON_SIZES.small : ICON_SIZES.medium;
  
  return (
    <Pressable
      style={[styles.button, styles[`${variant}Button`]]}
      onPress={onPress}
      android_ripple={{ color: rippleColor }}
    >
      <Ionicons 
        name={iconName as any} 
        size={iconSize} 
        color={variant === 'primary' ? COLORS.white : COLORS.textPrimary} 
      />
      <Text style={[
        styles.buttonText, 
        styles[`${variant}ButtonText`],
        isSmallDevice && styles.smallDeviceText
      ]}>
        {text}
      </Text>
    </Pressable>
  );
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onExport, onBack }) => {
  const isSmallDevice = DeviceDetection.isSmallDevice();
  
  return (
    <View style={[
      styles.container,
      isSmallDevice && styles.smallDeviceContainer
    ]}>
      <ResponsiveButton
        onPress={onExport}
        iconName="copy"
        text="Copy to Clipboard"
        variant="primary"
        rippleColor={COLORS.secondaryLight}
      />
      
      <ResponsiveButton
        onPress={onBack}
        iconName="arrow-back"
        text="Back"
        variant="secondary"
        rippleColor={COLORS.divider}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
    gap: SPACING.md,
    paddingHorizontal: SPACING.xs,
  },
  smallDeviceContainer: {
    flexDirection: 'column',
    gap: SPACING.sm,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderRadius: 8,
    minHeight: 48,
    ...SHADOWS.small,
  },
  primaryButton: {
    backgroundColor: COLORS.secondary,
  },
  secondaryButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  buttonText: {
    ...TYPOGRAPHY.button,
    marginLeft: SPACING.sm,
    textAlign: 'center',
    flexShrink: 1,
  },
  primaryButtonText: {
    color: COLORS.white,
  },
  secondaryButtonText: {
    color: COLORS.textPrimary,
  },
  smallDeviceText: {
    fontSize: TYPOGRAPHY.bodySmall.fontSize,
  },
});
