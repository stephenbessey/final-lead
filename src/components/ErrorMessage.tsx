import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '../constants/theme';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
  style?: any;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onDismiss, 
  style 
}) => (
  <View style={[styles.container, style]}>
    <Ionicons name="alert-circle" size={20} color={COLORS.error} />
    <Text style={styles.message}>{message}</Text>
    {onDismiss && (
      <Pressable onPress={onDismiss} style={styles.dismissButton}>
        <Ionicons name="close" size={20} color={COLORS.error} />
      </Pressable>
    )}
  </View>
);

const errorMessageStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.errorLight,
    padding: SPACING.md,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.error,
  },
  message: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.error,
    flex: 1,
    marginLeft: SPACING.sm,
  },
  dismissButton: {
    marginLeft: SPACING.sm,
    padding: SPACING.xs,
  },
});

const styles = errorMessageStyles;