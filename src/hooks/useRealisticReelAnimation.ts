import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { SLOT_MACHINE_CONFIG } from '../constants/slotMachine';
import { calculateSpinDistance, createExtendedEmojiList } from '../utils/slotMachineHelpers';

export const useRealisticReelAnimation = (
  isSpinning: boolean,
  emojis: readonly string[],
  duration: number,
  delay: number,
  finalIndex: number
): Animated.Value => {
  const translateY = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (isSpinning) {
      // Stop any existing animation
      if (animationRef.current) {
        animationRef.current.stop();
      }

      // Reset to starting position (accounting for the paddingTop)
      translateY.setValue(-SLOT_MACHINE_CONFIG.reel.itemHeight);

      // Create extended emoji list for calculations
      const extendedEmojis = createExtendedEmojiList(emojis);
      
      // Calculate the final stop position
      const finalDistance = calculateSpinDistance(extendedEmojis, finalIndex);
      
      // Create realistic spinning animation with proper easing
      const spinAnimation = Animated.timing(translateY, {
        toValue: finalDistance,
        duration: Math.max(duration - delay, 1000), // Ensure minimum duration
        useNativeDriver: true,
        // Use easing that simulates a real slot machine: fast start, gradual slowdown
        easing: (t: number) => {
          // Custom easing function for realistic slot machine feel
          // Quadratic ease-out for smooth deceleration
          return 1 - Math.pow(1 - t, 2.5);
        },
      });

      // Start animation after delay
      const delayedAnimation = Animated.sequence([
        Animated.delay(delay),
        spinAnimation,
      ]);

      animationRef.current = delayedAnimation;
      delayedAnimation.start();
    } else {
      // When not spinning, ensure we're in a proper resting position
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [isSpinning, finalIndex, duration, delay, translateY, emojis]);

  return translateY;
};