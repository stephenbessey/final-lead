import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatCurrency } from '../leads/leadFormatters';
import { COLORS, TYPOGRAPHY, SPACING } from '../constants/theme';

interface LeadHeaderProps {
  lead: {
    name: string;
    lifeEvent: string;
    propertyValue: number;
  };
  showPropertyValue?: boolean;
}

const formatLifeEvent = (lifeEvent: string): string => {
  const eventMap: Record<string, string> = {
    'baby': 'New Baby',
    'death': 'Death in Family',
    'married': 'Recently Married',
    'house-sold': 'House Sold',
    'divorced': 'Recently Divorced',
  };
  
  return eventMap[lifeEvent] || lifeEvent;
};

export const LeadHeader: React.FC<LeadHeaderProps> = ({
  lead,
  showPropertyValue = true,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{lead.name}</Text>
      <Text style={styles.lifeEvent}>{formatLifeEvent(lead.lifeEvent)}</Text>
      {showPropertyValue && (
        <Text style={styles.propertyValue}>
          {formatCurrency(lead.propertyValue)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginBottom: SPACING.md,
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
    ...TYPOGRAPHY.h2,
    color: COLORS.success,
    fontWeight: 'bold',
  },
});