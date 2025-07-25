import React from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/theme';

interface ToastProps {
  message: string;
  visible: boolean;
  type?: 'success' | 'error' | 'info';
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  visible, 
  type = 'info' 
}) => {
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, opacity]);

  if (!visible) return null;

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return COLORS.success;
      case 'error':
        return COLORS.error;
      default:
        return COLORS.primary;
    }
  };

  return (
    <Animated.View style={[
      styles.container,
      { 
        opacity,
        backgroundColor: getBackgroundColor(),
      }
    ]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: SPACING.lg,
    right: SPACING.lg,
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    zIndex: 1000,
    ...SHADOWS.medium,
  },
  message: {
    ...TYPOGRAPHY.body,
    color: COLORS.white,
    textAlign: 'center',
  },
});