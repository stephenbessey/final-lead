import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { ReelProps } from '../../types/slotMachine';
import { useRealisticReelAnimation } from '../../hooks/useRealisticReelAnimation';
import { createExtendedEmojiList, calculateReelHeight } from '../../utils/slotMachineHelpers';
import { COLORS, SHADOWS, DeviceDetection } from '../../constants/theme';
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
  const isSmallDevice = DeviceDetection.isSmallDevice();

  const emojiSize = isSmallDevice ? 28 : 36;

  return (
    <View style={styles.container}>
      <View style={[
        styles.window,
        { 
          height: calculateReelHeight(),
          width: SLOT_MACHINE_CONFIG.reel.width 
        }
      ]}>
        <Animated.View style={[
          styles.content, 
          { 
            transform: [{ translateY }],
            paddingTop: SLOT_MACHINE_CONFIG.reel.itemHeight
          }
        ]}>
          {extendedEmojis.map((emoji, index) => (
            <View 
              key={`${emoji}-${index}`} 
              style={[
                styles.emojiContainer,
                { height: SLOT_MACHINE_CONFIG.reel.itemHeight }
              ]}
            >
              <Text style={[
                styles.emoji,
                { fontSize: emojiSize }
              ]}>
                {emoji}
              </Text>
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
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: COLORS.primaryLight,
    ...SHADOWS.medium,
  },
  content: {
    alignItems: 'center',
  },
  emojiContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  emoji: {
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