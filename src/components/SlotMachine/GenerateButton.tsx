import React from 'react';
import { Text, StyleSheet, Pressable, Animated } from 'react-native';
import { EnhancedGenerateButtonProps } from '../../types/slotMachine';
import { getButtonText, isButtonDisabled } from '../../utils/buttonStateHelpers';
import { useButtonActions } from '../../hooks/useButtonActions';
import { ResponsiveConfigService } from '../../services/ResponsiveConfigService';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../../constants/theme';
import { ButtonState } from '../../hooks/useButtonState';

class ButtonStyleCalculator {
  private static configService = ResponsiveConfigService.getInstance();
  
  static getButtonStyle(buttonState: ButtonState) {
    const config = this.configService.getButtonConfig();
    const disabled = isButtonDisabled(buttonState);
    const isSpinning = buttonState === ButtonState.GENERATING;
    
    return [
      styles.baseButton,
      {
        backgroundColor: disabled 
          ? COLORS.textHint 
          : (isSpinning ? COLORS.primaryDark : COLORS.primary),
        paddingHorizontal: config.paddingHorizontal,
        paddingVertical: config.paddingVertical,
        minWidth: config.minWidth,
        maxWidth: config.maxWidth,
      }
    ];
  }

  static getTextStyle(buttonState: ButtonState) {
    const config = this.configService.getButtonConfig();
    
    return [
      styles.baseText,
      {
        fontSize: config.fontSize,
      }
    ];
  }
}

export const GenerateButton: React.FC<EnhancedGenerateButtonProps> = ({ 
  buttonState,
  onGeneratePress,
  onViewDetailsPress,
  pulseValue,
}) => {
  const { handlePress } = useButtonActions({
    buttonState,
    onGeneratePress,
    onViewDetailsPress,
  });
  
  const buttonStyle = ButtonStyleCalculator.getButtonStyle(buttonState);
  const textStyle = ButtonStyleCalculator.getTextStyle(buttonState);
  const disabled = isButtonDisabled(buttonState);
  
  return (
    <Animated.View style={[
      styles.container,
      { transform: [{ scale: pulseValue }] }
    ]}>
      <Pressable
        style={buttonStyle}
        onPress={handlePress}
        disabled={disabled}
        android_ripple={{ color: COLORS.primaryDark }}
      >
        <Text style={textStyle}>
          {getButtonText(buttonState)}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: SPACING.md,
  },
  baseButton: {
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.large,
  },
  baseText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
    textAlign: 'center',
    flexShrink: 1,
  },
});
