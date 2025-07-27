import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { ContactMethod } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/theme';

interface ContactActionsProps {
  onContactAction: (method: ContactMethod) => void;
}

interface ContactButton {
  id: string;
  title: string;
  icon: string;
  onPress: () => Promise<void>;
  color: string;
}

export const ContactActions: React.FC<ContactActionsProps> = ({
  onContactAction,
}) => {
  const buttons: ContactButton[] = [
    {
      id: 'call',
      title: 'Call',
      icon: '📞',
      onPress: async () => onContactAction('phone'),
      color: '#4CAF50',
    },
    {
      id: 'sms',
      title: 'SMS',
      icon: '💬',
      onPress: async () => onContactAction('sms'),
      color: '#2196F3',
    },
    {
      id: 'email',
      title: 'Email',
      icon: '✉️',
      onPress: async () => onContactAction('email'),
      color: '#FF9800',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Actions</Text>
      <View style={styles.buttonsContainer}>
        {buttons.map((button) => (
          <Pressable
            key={button.id}
            style={[styles.button, { backgroundColor: button.color }]}
            onPress={button.onPress}
          >
            <Text style={styles.icon}>{button.icon}</Text>
            <Text style={styles.buttonText}>{button.title}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  button: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderRadius: 8,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  icon: {
    fontSize: 24,
    marginBottom: SPACING.xs,
  },
  buttonText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.white,
    fontWeight: '600',
  },
});