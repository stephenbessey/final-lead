import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ContactMethod } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/theme';

interface ContactActionsProps {
  onContactAction: (method: ContactMethod) => void;
}

export const ContactActions: React.FC<ContactActionsProps> = ({ onContactAction }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Contact Actions</Text>
    
    <View style={styles.actionRow}>
      <Pressable
        style={styles.actionButton}
        onPress={() => onContactAction('phone')}
        android_ripple={{ color: COLORS.primaryDark }}
      >
        <Ionicons name="call" size={24} color={COLORS.white} />
        <Text style={styles.actionText}>Call</Text>
      </Pressable>
      
      <Pressable
        style={styles.actionButton}
        onPress={() => onContactAction('sms')}
        android_ripple={{ color: COLORS.primaryDark }}
      >
        <Ionicons name="chatbubble" size={24} color={COLORS.white} />
        <Text style={styles.actionText}>SMS</Text>
      </Pressable>
      
      <Pressable
        style={styles.actionButton}
        onPress={() => onContactAction('email')}
        android_ripple={{ color: COLORS.primaryDark }}
      >
        <Ionicons name="mail" size={24} color={COLORS.white} />
        <Text style={styles.actionText}>Email</Text>
      </Pressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: 12,
    marginBottom: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.title,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 80,
    ...SHADOWS.small,
  },
  actionText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.white,
    marginTop: SPACING.xs,
    fontWeight: '600',
  },
});