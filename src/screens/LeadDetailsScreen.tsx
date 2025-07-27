import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import { RootStackParamList } from '../../App';
import { ContactMethod } from '../types';
import { AppHeader } from '../components/AppHeader';
import { LeadHeader } from '../components/LeadHeader';
import { LeadContactInfo } from '../components/LeadContactInfo';
import { ContactActions } from '../components/ContactActions';
import { ActionButtons } from '../components/ActionButtons';
import { ClipboardFeedback } from '../components/ClipboardFeedback';
import { getLifeEventDisplay } from '../leads/lifeEvents';
import { formatLeadForExport } from '../utils/leadGenerator';
import { openContactApp, getContactMethodLabel } from '../contact/contactActions';
import { confirmContactAction, warnAboutDataLoss } from '../userInterface/alerts';

type LeadDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LeadDetails'>;
type LeadDetailsScreenRouteProp = RouteProp<RootStackParamList, 'LeadDetails'>;

interface Props {
  navigation: LeadDetailsScreenNavigationProp;
  route: LeadDetailsScreenRouteProp;
}

const LeadDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { lead } = route.params;
  const lifeEvent = getLifeEventDisplay(lead.lifeEvent);
  const [showClipboardFeedback, setShowClipboardFeedback] = useState(false);

  const handleContactAction = (method: ContactMethod): void => {
    const actionLabel = getContactMethodLabel(method);
    confirmContactAction(actionLabel, () => executeContactAction(method));
  };

  const executeContactAction = (method: ContactMethod): void => {
    const contact = method === 'email' ? lead.email : lead.phone;
    openContactApp(method, contact);
  };

  const handleExport = async (): Promise<void> => {
    try {
      const leadData = formatLeadForExport(lead);
      await Clipboard.setStringAsync(leadData);
      
      setShowClipboardFeedback(true);

      setTimeout(() => {
        setShowClipboardFeedback(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const handleBackNavigation = (): void => {
    warnAboutDataLoss(() => navigation.goBack());
  };

  const handleMenuPress = (): void => {
    navigation.navigate('Settings');
  };

  const handleProfilePress = (): void => {
    // Profile functionality
  };

  return (
    <View style={styles.container}>
      <AppHeader 
        onMenuPress={handleMenuPress}
        onProfilePress={handleProfilePress}
        showCredits={false}
      />
      
      <ScrollView style={styles.content}>
        <LeadHeader lead={lead} lifeEvent={lifeEvent} />
        <LeadContactInfo lead={lead} />
        <ContactActions onContactAction={handleContactAction} />
        <ActionButtons onExport={handleExport} onBack={handleBackNavigation} />
      </ScrollView>
      
      <ClipboardFeedback 
        visible={showClipboardFeedback}
        message="Lead details copied to clipboard!"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});

export default LeadDetailsScreen;