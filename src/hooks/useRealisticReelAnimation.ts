import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { calculateSpinDistance } from '../utils/slotMachineHelpers';

export const useRealisticReelAnimation = (
  isSpinning: boolean,
  emojis: readonly string[],
  duration: number,
  delay: number,
  finalIndex: number
) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const isAnimating = useRef(false);

  useEffect(() => {
    if (isSpinning && !isAnimating.current) {
      isAnimating.current = true;
      
      translateY.setValue(0);
      
      const spinDistance = calculateSpinDistance(emojis, finalIndex);
      const realisticEasing = Easing.out(Easing.cubic);
      
      console.log(`Reel ${delay/300}: finalIndex=${finalIndex}, spinDistance=${spinDistance}`);
      
      setTimeout(() => {
        Animated.timing(translateY, {
          toValue: spinDistance,
          duration,
          easing: realisticEasing,
          useNativeDriver: true,
        }).start(() => {
          isAnimating.current = false;
          console.log(`Reel ${delay/300}: Animation completed at ${spinDistance}`);
        });
      }, delay);
      
    } else if (!isSpinning) {
      isAnimating.current = false;
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isSpinning, emojis, duration, delay, finalIndex, translateY]);

  return translateY;
};
