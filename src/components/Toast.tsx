import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface ToastProps {
  message: string;
  visible: boolean;
  duration?: number;
  type?: 'success' | 'error' | 'info';
  onHide?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  visible,
  duration = 3000,
  type = 'info',
  onHide,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide?.();
      });
    }
  }, [visible, duration, fadeAnim, onHide]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        styles[type],
        { opacity: fadeAnim }
      ]}
    >
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    zIndex: 1000,
  },
  success: {
    backgroundColor: '#4CAF50',
  },
  error: {
    backgroundColor: '#F44336',
  },
  info: {
    backgroundColor: '#2196F3',
  },
  message: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});