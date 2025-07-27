import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { ResponsiveLayout } from '../components/ResponsiveLayout';
import { AppHeader } from '../components/AppHeader';
import { LeadHeader } from '../components/LeadHeader';
import { ContactActions } from '../components/ContactActions';
import { ActionButtons } from '../components/ActionButtons';
import { formatPhoneNumber, formatLeadForExport } from '../leads/leadFormatters';
import { useSmoothNavigation } from '../hooks/useSmoothNavigation';
import { Lead } from '../types';
import { COLORS, TYPOGRAPHY, SPACING } from '../constants/theme';

type LeadDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LeadDetails'>;
type LeadDetailsScreenRouteProp = RouteProp<RootStackParamList, 'LeadDetails'>;

interface Props {
  navigation: LeadDetailsScreenNavigationProp;
  route: LeadDetailsScreenRouteProp;
}

const LeadDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { lead } = route.params;
  const { navigateImmediately } = useSmoothNavigation(navigation);

  const handleMenuPress = useCallback(() => {
    navigateImmediately('Settings');
  }, [navigateImmediately]);

  const handleProfilePress = useCallback(() => {
  }, []);

  const handleContactAction = useCallback((method: 'phone' | 'sms' | 'email') => {
    console.log(`Contact action: ${method}`);
  }, []);

  const handleExport = useCallback(async () => {
    try {
      const exportData = formatLeadForExport(lead);
      Alert.alert('Export', 'Lead exported successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to export lead');
    }
  }, [lead]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const exportButtons = [
    {
      id: 'export',
      title: 'Export Lead',
      icon: 'download' as const,
      onPress: handleExport,
      color: COLORS.secondary,
    },
    {
      id: 'back',
      title: 'Back',
      icon: 'arrow-back' as const,
      onPress: handleBack, 
      color: COLORS.textSecondary,
    },
  ];

  return (
    <ResponsiveLayout scrollable edges={['top', 'left', 'right', 'bottom']}>
      <AppHeader 
        onMenuPress={handleMenuPress}
        onProfilePress={handleProfilePress}
        showCredits={false}
      />
      
      <ScrollView style={styles.content}>
        <LeadHeader 
          lead={{
            name: lead.name,
            lifeEvent: lead.lifeEvent,
            propertyValue: lead.propertyValue,
          }}
          showPropertyValue={true}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{formatPhoneNumber(lead.phone)}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{lead.email}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoValue}>{lead.address}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Actions</Text>
          <ContactActions 
            phone={lead.phone}
            email={lead.email}
            onContactAction={handleContactAction}
            layout="horizontal"
          />
        </View>

        <View style={styles.section}>
          <ActionButtons 
            buttons={exportButtons}
            layout="vertical"
          />
        </View>
      </ScrollView>
    </ResponsiveLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.headline,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoLabel: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
  },
  infoValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
});

export default LeadDetailsScreen;