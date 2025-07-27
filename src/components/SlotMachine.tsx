import React, { useCallback, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { ButtonState } from '../hooks/useButtonState';
import { useMachineEffects } from '../hooks/useMachineEffects';
import { useLead } from '../hooks/useLead';
import { Reel } from './SlotMachine/Reel';
import { SlotMachineFrame } from './SlotMachine/SlotMachineFrame';
import { GenerateButton } from './SlotMachine/GenerateButton';
import { Lead } from '../types';
import { COLORS, TYPOGRAPHY, SPACING } from '../constants/theme';
import { SLOT_MACHINE_CONFIG, SLOT_MACHINE_TEXTS, SLOT_MACHINE_EMOJIS } from '../constants/slotMachine';

interface SlotMachineProps {
  buttonState: ButtonState;
  onGeneratePress: () => void;
  onViewDetailsPress: () => void;
  onLeadGenerated: (lead: Lead) => void;
  duration?: number;
}

export const SlotMachine: React.FC<SlotMachineProps> = ({ 
  buttonState,
  onGeneratePress,
  onViewDetailsPress,
  onLeadGenerated,
  duration = SLOT_MACHINE_CONFIG.animation.duration,
}) => {
  const isSpinning = buttonState === ButtonState.GENERATING;
  const { scaleValue, pulseValue } = useMachineEffects(isSpinning, duration);
  const finalIndices = useRef<number[]>([0, 0, 0]);

  const handleIndicesGenerated = useCallback((indices: number[]) => {
    finalIndices.current = indices;
  }, []);

  const handleLeadResult = useCallback((lead: Lead): void => {
    onLeadGenerated(lead);
  }, [onLeadGenerated]);

  const { generateLeadWithDelay } = useLead(handleLeadResult, handleIndicesGenerated);

  useEffect(() => {
    if (isSpinning) {
      generateLeadWithDelay();
    }
  }, [isSpinning, generateLeadWithDelay]);

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
        buttonState={buttonState}
        onGeneratePress={onGeneratePress}
        onViewDetailsPress={onViewDetailsPress}
        pulseValue={pulseValue}
      />

      {isSpinning && (
        <Text style={styles.statusText}>
          {SLOT_MACHINE_TEXTS.statusMessage}
        </Text>
      )}

      {buttonState === ButtonState.VIEW_DETAILS && (
        <Text style={styles.readyText}>
          🎉 Lead Generated! Tap to view details.
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
  readyText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.success,
    marginTop: SPACING.lg,
    textAlign: 'center',
    fontWeight: '600',
  },
});