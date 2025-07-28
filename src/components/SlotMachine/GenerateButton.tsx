import React from 'react';
import { Text, StyleSheet, Pressable, Animated } from 'react-native';
import { EnhancedGenerateButtonProps } from '../../types/slotMachine';
import { getButtonText } from '../../utils/slotMachineHelpers';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, DeviceDetection } from '../../constants/theme';
import { SLOT_MACHINE_CONFIG } from '../../constants/slotMachine';

interface ButtonStyleConfig {
  minWidth: number;
  paddingHorizontal: number;
  paddingVertical: number;
  fontSize: number;
}

class ButtonStyleProvider {
  static getButtonConfig(): ButtonStyleConfig {
    const config = SLOT_MACHINE_CONFIG.button;
    return {
      minWidth: config.minWidth,
      paddingHorizontal: config.paddingHorizontal,
      paddingVertical: config.paddingVertical,
      fontSize: config.fontSize,
    };
  }

  static getButtonStyle(disabled: boolean, isSpinning: boolean, config: ButtonStyleConfig) {
    return [
      {
        backgroundColor: disabled ? COLORS.textHint : (isSpinning ? COLORS.primaryDark : COLORS.primary),
        paddingHorizontal: config.paddingHorizontal,
        paddingVertical: config.paddingVertical,
        borderRadius: 25,
        minWidth: config.minWidth,
        maxWidth: DeviceDetection.isSmallDevice() ? 280 : 320,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        ...SHADOWS.large,
      }
    ];
  }

  static getTextStyle(disabled: boolean, config: ButtonStyleConfig) {
    return [
      {
        ...TYPOGRAPHY.button,
        color: COLORS.white,
        fontSize: config.fontSize,
        textAlign: 'center' as const,
        flexShrink: 1, 
      }
    ];
  }
}

export const GenerateButton: React.FC<EnhancedGenerateButtonProps> = ({ 
  disabled, 
  isSpinning, 
  onPress,
  pulseValue,
}) => {
  const buttonConfig = ButtonStyleProvider.getButtonConfig();
  const buttonStyle = ButtonStyleProvider.getButtonStyle(disabled, isSpinning, buttonConfig);
  const textStyle = ButtonStyleProvider.getTextStyle(disabled, buttonConfig);
  
  return (
    <Animated.View style={[
      styles.buttonContainer,
      {
        transform: [{ scale: pulseValue }]
      }
    ]}>
      <Pressable
        style={buttonStyle}
        onPress={onPress}
        disabled={disabled || isSpinning}
        android_ripple={{ color: COLORS.primaryDark }}
      >
        <Text style={textStyle}>
          {getButtonText(disabled, isSpinning)}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    marginHorizontal: SPACING.md,
  },
});
