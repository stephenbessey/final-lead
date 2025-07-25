import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import { RootStackParamList } from '../../App';
import { AppHeader } from '../components/AppHeader';
import { LeadHeader } from '../components/LeadHeader';
import { LeadContactInfo } from '../components/LeadContactInfo';
import { ContactActions } from '../components/ContactActions';
import { ActionButtons } from '../components/ActionButtons';
import { getLifeEventDisplay } from '../leads/lifeEvents';
import { formatLeadForExport } from '../leads/leadFormatters';
import { openContactApp, getContactMethodLabel, ContactMethod } from '../contact/contactActions';
import { confirmContactAction, warnAboutDataLoss } from '../userInterface/alerts';
import { notifySuccess } from '../userInterface/notifications';

type LeadDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LeadDetails'>;
type LeadDetailsScreenRouteProp = RouteProp<RootStackParamList, 'LeadDetails'>;

interface Props {
  navigation: LeadDetailsScreenNavigationProp;
  route: LeadDetailsScreenRouteProp;
}

const LeadDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { lead } = route.params;
  const lifeEvent = getLifeEventDisplay(lead.lifeEvent);

  const handleContactAction = (method: ContactMethod): void => {
    const actionLabel = getContactMethodLabel(method);
    confirmContactAction(actionLabel, () => executeContactAction(method));
  };

  const executeContactAction = (method: ContactMethod): void => {
    const contact = method === 'email' ? lead.email : lead.phone;
    openContactApp(method, contact);
  };

  const handleExport = async (): Promise<void> => {
    const leadData = formatLeadForExport(lead);
    await Clipboard.setStringAsync(leadData);
    notifySuccess('Lead details copied to clipboard!');
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