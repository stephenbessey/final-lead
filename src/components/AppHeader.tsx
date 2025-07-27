import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/theme';

interface AppHeaderProps {
  onMenuPress: () => void;
  onProfilePress: () => void;
  showCredits: boolean;
  credits?: number;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onMenuPress,
  onProfilePress,
  showCredits,
  credits,
}) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.iconButton} onPress={onMenuPress}>
        <Ionicons name="menu" size={24} color={COLORS.primary} />
      </Pressable>

      <Text style={styles.title}>Lead Generator</Text>

      <View style={styles.rightSection}>
        {showCredits && (
          <View style={styles.creditsContainer}>
            <Text style={styles.creditsText}>{credits || 0} credits</Text>
          </View>
        )}
        
        <Pressable style={styles.iconButton} onPress={onProfilePress}>
          <Ionicons name="person-circle" size={24} color={COLORS.primary} />
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOWS.small,
  },
  iconButton: {
    padding: SPACING.sm,
    borderRadius: 20,
  },
  title: {
    ...TYPOGRAPHY.headline,
    color: COLORS.primary,
    flex: 1,
    textAlign: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creditsContainer: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
    marginRight: SPACING.sm,
  },
  creditsText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    fontWeight: '600',
  },
});