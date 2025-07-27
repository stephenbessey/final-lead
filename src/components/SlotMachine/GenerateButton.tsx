import React from 'react';
import { Text, StyleSheet, Pressable, Animated } from 'react-native';
import { EnhancedGenerateButtonProps } from '../../types/slotMachine';
import { getButtonText } from '../../utils/slotMachineHelpers';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../../constants/theme';
import { SLOT_MACHINE_CONFIG } from '../../constants/slotMachine';

export const GenerateButton: React.FC<EnhancedGenerateButtonProps> = ({ 
  disabled, 
  isSpinning, 
  onPress,
  pulseValue,
}) => {
  const getButtonStyle = () => [
    styles.button,
    disabled && styles.buttonDisabled,
    isSpinning && styles.buttonSpinning,
  ];

  return (
    <Animated.View style={[
      styles.buttonContainer,
      {
        transform: [{ scale: pulseValue }]
      }
    ]}>
      <Pressable
        style={getButtonStyle()}
        onPress={onPress}
        disabled={disabled || isSpinning}
        android_ripple={{ color: COLORS.primaryDark }}
      >
        <Text style={[
          styles.buttonText,
          disabled && styles.buttonTextDisabled,
        ]}>
          {getButtonText(disabled, isSpinning)}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: 25,
    minWidth: SLOT_MACHINE_CONFIG.button.minWidth,
    alignItems: 'center',
    ...SHADOWS.large,
  },
  buttonDisabled: {
    backgroundColor: COLORS.textHint,
  },
  buttonSpinning: {
    backgroundColor: COLORS.primaryDark,
  },
  buttonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
    fontSize: SLOT_MACHINE_CONFIG.button.fontSize,
  },
  buttonTextDisabled: {
    color: COLORS.white,
  },
});