import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Lead } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/theme';

interface LeadContactInfoProps {
  lead: Lead;
}

export const LeadContactInfo: React.FC<LeadContactInfoProps> = ({
  lead,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Information</Text>
      
      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <Text style={styles.label}>📞 Phone:</Text>
          <Text style={styles.value}>{lead.phone}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.label}>✉️ Email:</Text>
          <Text style={styles.value}>{lead.email}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.label}>🏠 Address:</Text>
          <Text style={styles.value}>{lead.address}</Text>
        </View>
        
        {lead.createdAt && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>📅 Generated:</Text>
            <Text style={styles.value}>
              {lead.createdAt instanceof Date 
                ? lead.createdAt.toLocaleDateString()
                : new Date(lead.createdAt).toLocaleDateString()
              }
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  infoGrid: {
    gap: SPACING.md,
  },
  infoItem: {
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  label: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  value: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
});