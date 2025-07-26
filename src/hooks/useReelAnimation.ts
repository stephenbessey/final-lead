import { useEffect } from 'react';
import { useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { SLOT_MACHINE_CONFIG } from '../constants/slotMachine';

export const useReelAnimation = (
  isSpinning: boolean,
  emojis: readonly string[],
  duration: number,
  delay: number,
  finalIndex: number
) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (isSpinning) {
      translateY.value = 0;
      
      const totalSpins = SLOT_MACHINE_CONFIG.animation.minSpins + 
        Math.random() * (SLOT_MACHINE_CONFIG.animation.maxSpins - SLOT_MACHINE_CONFIG.animation.minSpins);
      const finalPosition = -(finalIndex * SLOT_MACHINE_CONFIG.reel.itemHeight);
      const totalDistance = -(totalSpins * emojis.length * SLOT_MACHINE_CONFIG.reel.itemHeight) + finalPosition;

      translateY.value = withTiming(
        totalDistance,
        {
          duration: duration + delay,
          easing: Easing.out(Easing.cubic),
        }
      );
    } else {
      translateY.value = withTiming(0, { duration: 300 });
    }
  }, [isSpinning, emojis.length, duration, delay, finalIndex, translateY]);

  return translateY;
};