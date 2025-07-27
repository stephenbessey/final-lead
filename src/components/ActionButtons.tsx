import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/theme';

interface ActionButton {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void | Promise<void>; 
  color?: string;
  disabled?: boolean;
}

interface ActionButtonsProps {
  buttons: ActionButton[];
  layout?: 'horizontal' | 'vertical';
  onExport?: () => Promise<void>;
  onBack?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  buttons,
  layout = 'horizontal',
  onExport,
  onBack,
}) => {
  const containerStyle = [
    styles.container,
    layout === 'vertical' ? styles.verticalLayout : styles.horizontalLayout,
  ];

  return (
    <View style={containerStyle}>
      {buttons.map((button) => (
        <Pressable
          key={button.id}
          style={[
            styles.button,
            button.disabled && styles.buttonDisabled,
            { backgroundColor: button.color || COLORS.primary },
          ]}
          onPress={button.onPress}
          disabled={button.disabled}
          android_ripple={{ color: COLORS.white }}
        >
          <Ionicons
            name={button.icon}
            size={20}
            color={COLORS.white}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>{button.title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SPACING.sm,
  },
  horizontalLayout: {
    flexDirection: 'row',
  },
  verticalLayout: {
    flexDirection: 'column',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    flex: 1,
    minHeight: 44,
    ...SHADOWS.small,
  },
  buttonDisabled: {
    backgroundColor: COLORS.textHint,
    opacity: 0.6,
  },
  icon: {
    marginRight: SPACING.xs,
  },
  buttonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
    fontSize: 14,
  },
});