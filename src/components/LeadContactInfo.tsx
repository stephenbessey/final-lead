import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Lead } from '../types';
import { COLORS, TYPOGRAPHY, SPACING } from '../constants/theme';

interface LeadContactInfoProps {
  lead: Lead;
}

export const LeadContactInfo: React.FC<LeadContactInfoProps> = ({ lead }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Contact Information</Text>
    
    <View style={styles.infoRow}>
      <Ionicons name="call" size={20} color={COLORS.primary} />
      <Text style={styles.infoText}>{lead.phone}</Text>
    </View>
    
    <View style={styles.infoRow}>
      <Ionicons name="mail" size={20} color={COLORS.primary} />
      <Text style={styles.infoText}>{lead.email}</Text>
    </View>
    
    <View style={styles.infoRow}>
      <Ionicons name="location" size={20} color={COLORS.primary} />
      <Text style={styles.infoText}>{lead.address}</Text>
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  infoText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    marginLeft: SPACING.md,
    flex: 1,
  },
});