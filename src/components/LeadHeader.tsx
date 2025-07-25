import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Lead } from '../types';
import { COLORS, TYPOGRAPHY, SPACING } from '../constants/theme';

interface LeadHeaderProps {
  lead: Lead;
  lifeEvent: string;
}

export const LeadHeader: React.FC<LeadHeaderProps> = ({ lead, lifeEvent }) => (
  <View style={styles.container}>
    <Text style={styles.name}>{lead.name}</Text>
    <Text style={styles.lifeEvent}>{lifeEvent}</Text>
    <Text style={styles.propertyValue}>{lead.propertyValue}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: 12,
    marginBottom: SPACING.md,
    alignItems: 'center',
  },
  name: {
    ...TYPOGRAPHY.headline,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  lifeEvent: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  propertyValue: {
    ...TYPOGRAPHY.title,
    color: COLORS.success,
    fontWeight: 'bold',
  },
});