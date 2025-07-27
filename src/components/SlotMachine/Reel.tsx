import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import { ReelProps } from '../../types/slotMachine';
import { SLOT_MACHINE_CONFIG } from '../../constants/slotMachine';
import { COLORS, TYPOGRAPHY } from '../../constants/theme';

const ITEM_HEIGHT = SLOT_MACHINE_CONFIG.reel.itemHeight;
const VISIBLE_ITEMS = SLOT_MACHINE_CONFIG.reel.visibleItems;

export const Reel: React.FC<ReelProps> = ({
  emojis,
  isSpinning,
  duration,
  delay,
  finalIndex,
}) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  const createExtendedEmojiList = (originalEmojis: readonly string[]) => {
    const multiplier = 8; 
    const extended = [];
    for (let i = 0; i < multiplier; i++) {
      extended.push(...originalEmojis);
    }
    return extended;
  };

  const extendedEmojis = createExtendedEmojiList(emojis);

  const handleAnimationComplete = () => {
  };

  useEffect(() => {
    if (isSpinning) {
      translateY.value = 0;
      opacity.value = 1;

      const minSpins = 4;
      const maxSpins = 8;
      const randomSpins = minSpins + Math.random() * (maxSpins - minSpins);
      
      const singleCycleDistance = emojis.length * ITEM_HEIGHT;
      const totalSpinDistance = randomSpins * singleCycleDistance;
      
      const centerOffset = Math.floor(VISIBLE_ITEMS / 2) * ITEM_HEIGHT;
      const targetPosition = finalIndex * ITEM_HEIGHT - centerOffset;
      const finalDistance = -(totalSpinDistance + targetPosition);

      const spinAnimation = withDelay(
        delay,
        withSequence(
          withTiming(finalDistance * 0.3, {
            duration: duration * 0.2,
            easing: Easing.out(Easing.quad),
          }),
          withTiming(finalDistance * 0.85, {
            duration: duration * 0.5,
            easing: Easing.linear,
          }),
          withTiming(finalDistance, {
            duration: duration * 0.3,
            easing: Easing.out(Easing.cubic),
          }, () => {
            runOnJS(handleAnimationComplete)();
          })
        )
      );

      translateY.value = spinAnimation;

      opacity.value = withDelay(
        delay,
        withSequence(
          withTiming(0.9, { duration: 100 }),
          withTiming(1, { duration: duration - 100 })
        )
      );
    } else {
      translateY.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.cubic),
      });
      opacity.value = withTiming(1, { duration: 300 });
    }
  }, [isSpinning, duration, delay, finalIndex, emojis.length]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const maskHeight = VISIBLE_ITEMS * ITEM_HEIGHT;

  return (
    <View style={[styles.container, { height: maskHeight }]}>
      <Animated.View style={[styles.reelContainer, animatedStyle]}>
        {extendedEmojis.map((emoji, index) => (
          <View key={index} style={styles.emojiContainer}>
            <Text style={styles.emoji}>{emoji}</Text>
          </View>
        ))}
      </Animated.View>
      
      <View style={styles.topMask} />
      <View style={styles.bottomMask} />
      <View style={styles.centerHighlight} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SLOT_MACHINE_CONFIG.reel.width,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  reelContainer: {
    alignItems: 'center',
  },
  emojiContainer: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  emoji: {
    fontSize: 32,
    textAlign: 'center',
    ...TYPOGRAPHY.emoji,
  },
  topMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    pointerEvents: 'none',
  },
  bottomMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    pointerEvents: 'none',
  },
  centerHighlight: {
    position: 'absolute',
    top: ITEM_HEIGHT,
    left: 2,
    right: 2,
    height: ITEM_HEIGHT,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 8,
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    pointerEvents: 'none',
  },
}); 