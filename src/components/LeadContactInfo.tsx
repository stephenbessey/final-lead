import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Lead } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, ICON_SIZES, DeviceDetection } from '../constants/theme';

interface LeadContactInfoProps {
  lead: Lead;
}

interface ContactRowProps {
  iconName: string;
  text: string;
  isLongText?: boolean;
}

const ContactRow: React.FC<ContactRowProps> = ({ iconName, text, isLongText = false }) => {
  const isSmallDevice = DeviceDetection.isSmallDevice();
  const iconSize = isSmallDevice ? ICON_SIZES.small : ICON_SIZES.medium;
  
  return (
    <View style={[
      styles.infoRow,
      isLongText && styles.longTextRow,
      isSmallDevice && styles.smallDeviceRow
    ]}>
      <View style={styles.iconContainer}>
        <Ionicons name={iconName as any} size={iconSize} color={COLORS.primary} />
      </View>
      <Text style={[
        styles.infoText,
        isSmallDevice && styles.smallDeviceText,
        isLongText && styles.longText
      ]}>
        {text}
      </Text>
    </View>
  );
};

export const LeadContactInfo: React.FC<LeadContactInfoProps> = ({ lead }) => {
  const isSmallDevice = DeviceDetection.isSmallDevice();
  
  return (
    <View style={[
      styles.container,
      isSmallDevice && styles.smallDeviceContainer
    ]}>
      <Text style={[
        styles.title,
        isSmallDevice && styles.smallDeviceTitle
      ]}>
        Contact Information
      </Text>
      
      <ContactRow iconName="call" text={lead.phone} />
      <ContactRow iconName="mail" text={lead.email} isLongText />
      <ContactRow iconName="location" text={lead.address} isLongText />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: 12,
    marginBottom: SPACING.md,
    marginHorizontal: SPACING.xs, // Prevent edge cutoff
  },
  smallDeviceContainer: {
    padding: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.title,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  smallDeviceTitle: {
    ...TYPOGRAPHY.subtitle,
    marginBottom: SPACING.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
    paddingRight: SPACING.sm,
  },
  smallDeviceRow: {
    marginBottom: SPACING.xs,
  },
  longTextRow: {
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: ICON_SIZES.large,
    alignItems: 'center',
    paddingTop: 2,
  },
  infoText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
    flex: 1,
    flexWrap: 'wrap',
  },
  smallDeviceText: {
    ...TYPOGRAPHY.bodySmall,
    marginLeft: SPACING.xs,
  },
  longText: {
    lineHeight: TYPOGRAPHY.body.lineHeight * 1.1,
  },
});
