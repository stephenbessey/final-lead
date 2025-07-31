import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/theme';

interface AppHeaderProps {
  onSettingsPress?: () => void;
  onProfilePress: () => void;
  showCredits?: boolean;
  credits?: number;
  title?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onSettingsPress,
  onProfilePress,
  showCredits = false,
  credits = 0,
  title,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {title && (
          <Text style={styles.title}>{title}</Text>
        )}
      </View>
      
      {showCredits && (
        <View style={styles.creditsContainer}>
          <Text style={styles.creditsText}>{credits} Credits</Text>
        </View>
      )}
      
      <View style={styles.rightSection}>
        {onSettingsPress && (
          <Pressable style={styles.settingsButton} onPress={onSettingsPress}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </Pressable>
        )}
        
        <Pressable style={styles.profileButton} onPress={onProfilePress}>
          <Text style={styles.profileIcon}>👤</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
  },
  creditsContainer: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
  },
  creditsText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    fontWeight: '600',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  settingsButton: {
    padding: SPACING.sm,
  },
  settingsIcon: {
    fontSize: 24,
  },
  profileButton: {
    padding: SPACING.sm,
  },
  profileIcon: {
    fontSize: 24,
  },
});
