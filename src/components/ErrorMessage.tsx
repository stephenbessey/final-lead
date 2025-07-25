import React from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../constants/theme';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
  variant?: 'error' | 'warning' | 'info';
  style?: ViewStyle;
  showIcon?: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onDismiss,
  variant = 'error',
  style,
  showIcon = true,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
        return {
          container: styles.warningContainer,
          text: styles.warningText,
          icon: 'warning' as const,
          iconColor: COLORS.warning,
        };
      case 'info':
        return {
          container: styles.infoContainer,
          text: styles.infoText,
          icon: 'information-circle' as const,
          iconColor: COLORS.primary,
        };
      default:
        return {
          container: styles.errorContainer,
          text: styles.errorText,
          icon: 'alert-circle' as const,
          iconColor: COLORS.error,
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <View style={[variantStyles.container, style]}>
      <View style={styles.content}>
        {showIcon && (
          <Ionicons 
            name={variantStyles.icon} 
            size={20} 
            color={variantStyles.iconColor}
            style={styles.icon}
          />
        )}
        <Text style={[styles.baseText, variantStyles.text]}>
          {message}
        </Text>
        {onDismiss && (
          <Pressable 
            onPress={onDismiss}
            style={styles.dismissButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons 
              name="close" 
              size={18} 
              color={variantStyles.iconColor}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: SPACING.sm,
  },
  baseText: {
    ...TYPOGRAPHY.bodySmall,
    flex: 1,
    lineHeight: 18,
  },
  dismissButton: {
    marginLeft: SPACING.sm,
    padding: SPACING.xs,
  },
  
  // Error variant
  errorContainer: {
    backgroundColor: COLORS.errorLight,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
  },
  
  // Warning variant
  warningContainer: {
    backgroundColor: COLORS.warningLight,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  warningText: {
    color: COLORS.warning,
  },
  
  // Info variant
  infoContainer: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  infoText: {
    color: COLORS.primary,
  },
});