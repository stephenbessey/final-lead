import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { RootStackParamList } from '../../App';
import { AppHeader } from '../components/AppHeader';
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

  return (
    <View style={styles.container}>
      <AppHeader 
        onMenuPress={() => navigation.navigate('Settings')}
        onProfilePress={() => {}}
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


export default LeadDetailsScreen;