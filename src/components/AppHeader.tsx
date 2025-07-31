import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/theme';

interface AppHeaderProps {
  onMenuPress: () => void;
  onProfilePress: () => void;
  showCredits?: boolean;
  credits?: number;
  title?: string;
  showBackButton?: boolean; 
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onMenuPress,
  onProfilePress,
  showCredits = false,
  credits = 0,
  title,
  showBackButton = false, 
}) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.menuButton} onPress={onMenuPress}>
        {showBackButton ? (
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        ) : (
          <Ionicons name="settings" size={24} color={COLORS.textPrimary} />
        )}
      </Pressable>
      
      {title && (
        <Text style={styles.title}>{title}</Text>
      )}
      
      {showCredits && (
        <View style={styles.creditsContainer}>
          <Text style={styles.creditsText}>{credits} Credits</Text>
        </View>
      )}
      
      <Pressable style={styles.profileButton} onPress={onProfilePress}>
        <Text style={styles.profileIcon}>👤</Text>
      </Pressable>
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
  menuButton: {
    padding: SPACING.sm,
    minWidth: 40, 
    alignItems: 'center',
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    flex: 1,
    textAlign: 'center',
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
  profileButton: {
    padding: SPACING.sm,
  },
  profileIcon: {
    fontSize: 24,
  },
});