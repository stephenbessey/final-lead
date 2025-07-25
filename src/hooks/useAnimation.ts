import { useRef } from 'react';
import { Animated } from 'react-native';

interface UseAnimationReturn {
  fadeAnim: Animated.Value;
  scaleAnim: Animated.Value;
  fadeIn: (duration?: number) => void;
  fadeOut: (duration?: number) => void;
  scaleIn: (duration?: number) => void;
  scaleOut: (duration?: number) => void;
  pulse: (duration?: number) => void;
}

export const useAnimation = (): UseAnimationReturn => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const fadeIn = (duration = 300): void => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = (duration = 300): void => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const scaleIn = (duration = 200): void => {
    Animated.timing(scaleAnim, {
      toValue: 1.1,
      duration,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
      }).start();
    });
  };

  const scaleOut = (duration = 200): void => {
    Animated.timing(scaleAnim, {
      toValue: 0.9,
      duration,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
      }).start();
    });
  };

  const pulse = (duration = 1000): void => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  return {
    fadeAnim,
    scaleAnim,
    fadeIn,
    fadeOut,
    scaleIn,
    scaleOut,
    pulse,
  };
};