import React, { useCallback, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { SlotMachineProps } from '../types/slotMachine';
import { useMachineEffects } from '../hooks/useMachineEffects';
import { useLead } from '../hooks/useLead';
import { generateRandomFinalIndices } from '../utils/slotMachineHelpers';
import { Reel } from './SlotMachine/Reel';
import { SlotMachineFrame } from './SlotMachine/SlotMachineFrame';
import { GenerateButton } from './SlotMachine/GenerateButton';
import { COLORS, TYPOGRAPHY, SPACING } from '../constants/theme';
import { SLOT_MACHINE_CONFIG, SLOT_MACHINE_TEXTS, SLOT_MACHINE_EMOJIS } from '../constants/slotMachine';

export const SlotMachine: React.FC<SlotMachineProps> = ({ 
  isSpinning, 
  onResult,
  onGeneratePress,
  disabled = false,
  duration = SLOT_MACHINE_CONFIG.animation.duration,
}) => {
  const { scaleValue, pulseValue } = useMachineEffects(isSpinning, duration);
  const finalIndices = useRef<number[]>([0, 0, 0]);

  const handleIndicesGenerated = useCallback((indices: number[]) => {
    finalIndices.current = indices;
  }, []);

  const { generateLeadWithDelay } = useLead(onResult, handleIndicesGenerated);

  useEffect(() => {
    if (isSpinning) {
      generateLeadWithDelay();
    }
  }, [isSpinning, generateLeadWithDelay]);

  const handleGeneratePress = useCallback(() => {
    onGeneratePress();
  }, [onGeneratePress]);

  const reelEmojis = [
    SLOT_MACHINE_EMOJIS.lifeEvents,
    SLOT_MACHINE_EMOJIS.priceRanges,
    SLOT_MACHINE_EMOJIS.clientTypes,
  ];

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.machineContainer,
        {
          transform: [{ scale: scaleValue }]
        }
      ]}>
        <SlotMachineFrame>
          {reelEmojis.map((emojis, index) => (
            <Reel
              key={index}
              emojis={emojis}
              isSpinning={isSpinning}
              duration={duration}
              delay={index * SLOT_MACHINE_CONFIG.animation.reelStaggerDelay}
              finalIndex={finalIndices.current[index]}
            />
          ))}
        </SlotMachineFrame>
      </Animated.View>

      <GenerateButton
        disabled={disabled}
        isSpinning={isSpinning}
        onPress={handleGeneratePress}
        pulseValue={pulseValue}
      />

      {isSpinning && (
        <Text style={styles.statusText}>
          {SLOT_MACHINE_TEXTS.statusMessage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    flex: 1,
  },
  machineContainer: {
    marginBottom: SPACING.xl,
  },
  statusText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginTop: SPACING.lg,
    textAlign: 'center',
  },
});