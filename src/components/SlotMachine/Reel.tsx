import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { ReelProps } from '../../types/slotMachine';
import { useRealisticReelAnimation } from '../../hooks/useRealisticReelAnimation';
import { createExtendedEmojiList, calculateReelHeight } from '../../utils/slotMachineHelpers';
import { COLORS, SHADOWS } from '../../constants/theme';
import { SLOT_MACHINE_CONFIG } from '../../constants/slotMachine';

export const Reel: React.FC<ReelProps> = ({ 
  emojis, 
  isSpinning, 
  duration, 
  delay, 
  finalIndex 
}) => {
  const translateY = useRealisticReelAnimation(isSpinning, emojis, duration, delay, finalIndex);
  const extendedEmojis = createExtendedEmojiList(emojis);

  return (
    <View style={styles.container}>
      <View style={styles.window}>
        <Animated.View style={[
          styles.content, 
          { transform: [{ translateY }] }
        ]}>
          {extendedEmojis.map((emoji, index) => (
            <View key={`${emoji}-${index}`} style={styles.emojiContainer}>
              <Text style={styles.emoji}>{emoji}</Text>
            </View>
          ))}
        </Animated.View>
      </View>
      
      <View style={styles.centerLine} />
      <View style={styles.frame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  window: {
    height: calculateReelHeight(),
    width: SLOT_MACHINE_CONFIG.reel.width,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: COLORS.primaryLight,
    ...SHADOWS.medium,
  },
  content: {
    alignItems: 'center',
    // Start positioned to show first emoji in center
    paddingTop: SLOT_MACHINE_CONFIG.reel.itemHeight,
  },
  emojiContainer: {
    height: SLOT_MACHINE_CONFIG.reel.itemHeight,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  emoji: {
    fontSize: 36,
    textAlign: 'center',
  },
  centerLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: COLORS.primary,
    opacity: 0.3,
    pointerEvents: 'none',
  },
  frame: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primaryDark,
    pointerEvents: 'none',
  },
});