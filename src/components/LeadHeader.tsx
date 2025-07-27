import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Lead } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/theme';

interface LeadHeaderProps {
  lead: Lead;
  lifeEvent: string;
}

export const LeadHeader: React.FC<LeadHeaderProps> = ({
  lead,
  lifeEvent,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{lead.name}</Text>
        <Text style={styles.propertyValue}>{lead.propertyValue}</Text>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Life Event:</Text>
          <Text style={styles.detailValue}>{lifeEvent}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Client Type:</Text>
          <Text style={styles.detailValue}>
            {lead.clientType === 'buyer' ? 'Buyer' : 'Seller'}
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Price Range:</Text>
          <Text style={styles.detailValue}>
            {lead.priceRange === '$' ? 'Budget' : 
             lead.priceRange === '$$' ? 'Mid-Range' : 'Premium'}
          </Text>
        </View>
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
    ...SHADOWS.medium,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  name: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  propertyValue: {
    ...TYPOGRAPHY.h3,
    color: COLORS.success,
    fontWeight: '700',
  },
  details: {
    gap: SPACING.sm,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  detailValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
});