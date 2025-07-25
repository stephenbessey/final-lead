import React, { useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { Lead } from '../types';
import { generateRandomLead } from '../utils/leadGenerator';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/theme';

interface SlotMachineProps {
  isSpinning: boolean;
  onResult: (lead: Lead) => void;
  onGeneratePress: () => void;
  disabled?: boolean;
  duration?: number;
}

const ANIMATION_DURATION = 3000;
const GENERATION_DELAY = 2500;

export const SlotMachine: React.FC<SlotMachineProps> = ({ 
  isSpinning, 
  onResult,
  onGeneratePress,
  disabled = false,
  duration = ANIMATION_DURATION,
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  const generateLead = useCallback((): void => {
    setTimeout(() => {
      const lead = generateRandomLead();
      onResult(lead);
    }, GENERATION_DELAY);
  }, [onResult]);

  const startSpinAnimation = useCallback((): void => {
    spinValue.setValue(0);
    scaleValue.setValue(1);

    Animated.parallel([
      Animated.timing(spinValue, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: duration / 4,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: duration / 4,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [spinValue, scaleValue, duration]);

  useEffect(() => {
    if (isSpinning) {
      startSpinAnimation();
      generateLead();
    } else {
      spinValue.setValue(0);
      scaleValue.setValue(1);
    }
  }, [isSpinning, startSpinAnimation, generateLead, spinValue, scaleValue]);

  const opacity = spinValue.interpolate({
    inputRange: [0, 0.3, 0.7, 1],
    outputRange: [1, 0.3, 0.3, 1],
  });

  const rotation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getButtonText = (): string => {
    if (disabled) return 'No Credits';
    if (isSpinning) return 'Generating...';
    return 'Generate Lead';
  };

  const getButtonStyle = () => [
    styles.generateButton,
    disabled && styles.generateButtonDisabled,
    isSpinning && styles.generateButtonSpinning,
  ];

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.slotContainer,
        {
          opacity,
          transform: [
            { scale: scaleValue },
            { rotate: rotation },
          ],
        },
      ]}>
        <Text style={styles.slotText}>🎰</Text>
      </Animated.View>

      <Pressable
        style={getButtonStyle()}
        onPress={onGeneratePress}
        disabled={disabled || isSpinning}
        android_ripple={{ color: COLORS.primaryDark }}
      >
        <Text style={[
          styles.buttonText,
          disabled && styles.buttonTextDisabled,
        ]}>
          {getButtonText()}
        </Text>
      </Pressable>

      {isSpinning && (
        <Text style={styles.statusText}>
          Finding your perfect lead...
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  slotContainer: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.surface,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    ...SHADOWS.medium,
  },
  slotText: {
    fontSize: 48,
  },
  generateButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: 25,
    minWidth: 200,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  generateButtonDisabled: {
    backgroundColor: COLORS.textHint,
  },
  generateButtonSpinning: {
    backgroundColor: COLORS.primaryDark,
  },
  buttonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
  },
  buttonTextDisabled: {
    color: COLORS.white,
  },
  statusText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
});