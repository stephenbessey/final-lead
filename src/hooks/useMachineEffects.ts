import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { SLOT_MACHINE_CONFIG } from '../constants/slotMachine';

export const useMachineEffects = (isSpinning: boolean, duration: number) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isSpinning) {
      const vibrationAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.02,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 0.98,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
        { iterations: SLOT_MACHINE_CONFIG.animation.vibrationCycles }
      );
      
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 1.1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
      
      vibrationAnimation.start();
      pulseAnimation.start();
      
      setTimeout(() => {
        vibrationAnimation.stop();
        pulseAnimation.stop();
        Animated.parallel([
          Animated.timing(scaleValue, { 
            toValue: 1, 
            duration: 300, 
            useNativeDriver: true 
          }),
          Animated.timing(pulseValue, { 
            toValue: 1, 
            duration: 300, 
            useNativeDriver: true 
          }),
        ]).start();
      }, duration + 500);
      
    } else {
      Animated.parallel([
        Animated.timing(scaleValue, { 
          toValue: 1, 
          duration: 300, 
          useNativeDriver: true 
        }),
        Animated.timing(pulseValue, { 
          toValue: 1, 
          duration: 300, 
          useNativeDriver: true 
        }),
      ]).start();
    }
  }, [isSpinning, duration, scaleValue, pulseValue]);

  return { scaleValue, pulseValue };
};