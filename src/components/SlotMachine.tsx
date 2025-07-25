import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface SlotMachineProps {
  isSpinning: boolean;
  finalText?: string;
  duration?: number;
}

export const SlotMachine: React.FC<SlotMachineProps> = ({ 
  isSpinning, 
  finalText = '',
  duration = 3000
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSpinning) {
      const animation = Animated.timing(spinValue, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      });
      animation.start();
    } else {
      spinValue.setValue(0);
    }
  }, [isSpinning, duration, spinValue]);

  const opacity = spinValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.3, 1],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.textContainer, { opacity }]}>
        <Text style={styles.text}>
          {isSpinning ? 'Generating...' : finalText}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
});