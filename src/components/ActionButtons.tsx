import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/theme';

interface ActionButtonsProps {
  onExport: () => void;
  onBack: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onExport, onBack }) => (
  <View style={styles.container}>
    <Pressable
      style={[styles.button, styles.exportButton]}
      onPress={onExport}
      android_ripple={{ color: COLORS.secondaryLight }}
    >
      <Ionicons name="download" size={20} color={COLORS.white} />
      <Text style={styles.buttonText}>Export Lead</Text>
    </Pressable>
    
    <Pressable
      style={[styles.button, styles.backButton]}
      onPress={onBack}
      android_ripple={{ color: COLORS.divider }}
    >
      <Ionicons name="arrow-back" size={20} color={COLORS.textPrimary} />
      <Text style={[styles.buttonText, styles.backButtonText]}>Back</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
    gap: SPACING.md,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: 8,
    ...SHADOWS.small,
  },
  exportButton: {
    backgroundColor: COLORS.secondary,
  },
  backButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  buttonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
    marginLeft: SPACING.sm,
  },
  backButtonText: {
    color: COLORS.textPrimary,
  },
});