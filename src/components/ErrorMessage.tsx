import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '../constants/theme';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
  type?: 'error' | 'warning' | 'info';
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onDismiss,
  type = 'error',
}) => {
  const getIconName = () => {
    switch (type) {
      case 'warning':
        return 'warning' as const;
      case 'info':
        return 'information-circle' as const;
      default:
        return 'alert-circle' as const;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'warning':
        return {
          background: COLORS.warningLight,
          border: COLORS.warning,
          text: COLORS.warning,
          icon: COLORS.warning,
        };
      case 'info':
        return {
          background: COLORS.primaryLight,
          border: COLORS.primary,
          text: COLORS.primary,
          icon: COLORS.primary,
        };
      default:
        return {
          background: COLORS.errorLight,
          border: COLORS.error,
          text: COLORS.error,
          icon: COLORS.error,
        };
    }
  };

  const colors = getColors();

  return (
    <View style={[
      styles.container,
      { 
        backgroundColor: colors.background,
        borderColor: colors.border,
      }
    ]}>
      <Ionicons 
        name={getIconName()} 
        size={20} 
        color={colors.icon} 
        style={styles.icon}
      />
      
      <Text style={[styles.message, { color: colors.text }]}>
        {message}
      </Text>
      
      {onDismiss && (
        <Pressable style={styles.dismissButton} onPress={onDismiss}>
          <Ionicons name="close" size={16} color={colors.icon} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: SPACING.sm,
  },
  icon: {
    marginRight: SPACING.sm,
  },
  message: {
    ...TYPOGRAPHY.bodySmall,
    flex: 1,
  },
  dismissButton: {
    padding: SPACING.xs,
    marginLeft: SPACING.sm,
  },
});