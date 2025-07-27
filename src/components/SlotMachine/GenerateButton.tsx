import React from 'react';
import { Text, StyleSheet, Pressable, Animated } from 'react-native';
import { ButtonState } from '../../hooks/useButtonState';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../../constants/theme';
import { SLOT_MACHINE_CONFIG } from '../../constants/slotMachine';

interface GenerateButtonProps {
  buttonState: ButtonState;
  onGeneratePress: () => void;
  onViewDetailsPress: () => void;
  pulseValue: Animated.Value;
}

const getButtonText = (state: ButtonState): string => {
  switch (state) {
    case ButtonState.GENERATE:
      return 'Generate Lead';
    case ButtonState.GENERATING:
      return 'Generating...';
    case ButtonState.VIEW_DETAILS:
      return 'View Lead Details';
    case ButtonState.NO_CREDITS:
      return 'No Credits';
    default:
      return 'Generate Lead';
  }
};

const getButtonStyle = (state: ButtonState) => {
  const baseStyle = [styles.button];
  
  switch (state) {
    case ButtonState.NO_CREDITS:
      return [...baseStyle, styles.buttonDisabled];
    case ButtonState.GENERATING:
      return [...baseStyle, styles.buttonSpinning];
    case ButtonState.VIEW_DETAILS:
      return [...baseStyle, styles.buttonViewDetails];
    default:
      return baseStyle;
  }
};

const getTextStyle = (state: ButtonState) => {
  const baseStyle = [styles.buttonText];
  
  if (state === ButtonState.NO_CREDITS) {
    return [...baseStyle, styles.buttonTextDisabled];
  }
  
  return baseStyle;
};

export const GenerateButton: React.FC<GenerateButtonProps> = ({
  buttonState,
  onGeneratePress,
  onViewDetailsPress,
  pulseValue,
}) => {
  const isDisabled = buttonState === ButtonState.NO_CREDITS || buttonState === ButtonState.GENERATING;
  const isViewDetails = buttonState === ButtonState.VIEW_DETAILS;
  
  const handlePress = (): void => {
    if (isViewDetails) {
      onViewDetailsPress();
    } else {
      onGeneratePress();
    }
  };

  return (
    <Animated.View style={[
      styles.buttonContainer,
      { transform: [{ scale: pulseValue }] }
    ]}>
      <Pressable
        style={getButtonStyle(buttonState)}
        onPress={handlePress}
        disabled={isDisabled}
        android_ripple={{ color: COLORS.primaryDark }}
      >
        <Text style={getTextStyle(buttonState)}>
          {getButtonText(buttonState)}
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
  buttonViewDetails: {
    backgroundColor: COLORS.success,
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