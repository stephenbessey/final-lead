import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/theme';

interface ActionButtonsProps {
  onExport: () => Promise<void>;
  onBack: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onExport,
  onBack,
}) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.exportButton} onPress={onExport}>
        <Text style={styles.exportButtonText}>Export Lead</Text>
      </Pressable>
      
      <Pressable style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.xl,
  },
  exportButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  exportButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
  },
  backButton: {
    flex: 1,
    backgroundColor: COLORS.textHint,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  backButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
  },
});