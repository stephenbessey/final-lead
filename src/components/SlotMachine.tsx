import React, { useCallback, useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { SlotMachineProps } from '../types/slotMachine';
import { useMachineEffects } from '../hooks/useMachineEffects';
import { useLead } from '../hooks/useLead';
import { generateRandomFinalIndices } from '../utils/slotMachineHelpers';
import { Reel } from './SlotMachine/Reel';
import { SlotMachineFrame } from './SlotMachine/SlotMachineFrame';
import { GenerateButton } from './SlotMachine/GenerateButton';
import { COLORS, TYPOGRAPHY, SPACING } from '../constants/theme';
import { 
  SLOT_MACHINE_CONFIG, 
  SLOT_MACHINE_TEXTS, 
  SLOT_MACHINE_EMOJIS 
} from '../constants/slotMachine';

export const SlotMachine: React.FC<SlotMachineProps> = ({ 
  isSpinning, 
  onResult,
  onGeneratePress,
  disabled = false,
  duration = SLOT_MACHINE_CONFIG.animation.duration,
}) => {
  const { scaleValue, pulseValue } = useMachineEffects(isSpinning, duration);
  const finalIndices = useRef<number[]>([0, 0, 0]);
  const [currentStatus, setCurrentStatus] = useState<string>('');
  const [showSkipOption, setShowSkipOption] = useState(false);
  const [canSkip, setCanSkip] = useState(false);

  const handleIndicesGenerated = useCallback((indices: number[]) => {
    finalIndices.current = indices;
  }, []);

  const { generateLeadWithDelay, triggerEarlyResult } = useLead(onResult, handleIndicesGenerated);

  useEffect(() => {
    if (!isSpinning) {
      setCurrentStatus('');
      setShowSkipOption(false);
      setCanSkip(false);
      return;
    }

    const messages = Object.values(SLOT_MACHINE_TEXTS.statusMessages);
    let messageIndex = 0;
    
    const rotateMessages = () => {
      setCurrentStatus(messages[messageIndex]);
      messageIndex = (messageIndex + 1) % messages.length;
    };

    rotateMessages();
    
    const messageInterval = setInterval(rotateMessages, 1200);

    const skipTimer = setTimeout(() => {
      if (SLOT_MACHINE_CONFIG.userControl.showSkipOption) {
        setShowSkipOption(true);
        setCanSkip(true);
      }
    }, SLOT_MACHINE_CONFIG.userControl.skipAvailableAfter);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(skipTimer);
    };
  }, [isSpinning]);

  useEffect(() => {
    if (isSpinning) {
      generateLeadWithDelay();
    }
  }, [isSpinning, generateLeadWithDelay]);

  const handleGeneratePress = useCallback(() => {
    onGeneratePress();
  }, [onGeneratePress]);

  const handleSkipAnimation = useCallback(() => {
    if (canSkip && triggerEarlyResult) {
      triggerEarlyResult();
      setShowSkipOption(false);
      setCanSkip(false);
    }
  }, [canSkip, triggerEarlyResult]);

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
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            {currentStatus}
          </Text>
          
          {showSkipOption && canSkip && (
            <Pressable 
              style={styles.skipButton}
              onPress={handleSkipAnimation}
              android_ripple={{ color: COLORS.primaryLight }}
            >
              <Text style={styles.skipButtonText}>
                {SLOT_MACHINE_TEXTS.buttons.viewResults}
              </Text>
            </Pressable>
          )}
        </View>
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
  statusContainer: {
    alignItems: 'center',
    marginTop: SPACING.lg,
    minHeight: 80, 
  },
  statusText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  skipButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    marginTop: SPACING.sm,
  },
  skipButtonText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    fontWeight: '500',
  },
});