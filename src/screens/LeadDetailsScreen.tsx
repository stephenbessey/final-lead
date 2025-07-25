import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Linking } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { AppHeader } from '../components/AppHeader';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

type LeadDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LeadDetails'>;
type LeadDetailsScreenRouteProp = RouteProp<RootStackParamList, 'LeadDetails'>;

interface Props {
  navigation: LeadDetailsScreenNavigationProp;
  route: LeadDetailsScreenRouteProp;
}

const getLifeEventDisplay = (event: string): { icon: string; label: string } => {
  const eventMap = {
    baby: { icon: 'baby', label: 'New Baby' },
    death: { icon: 'flower', label: 'Death in Family' },
    married: { icon: 'heart', label: 'Recently Married' },
    'house-sold': { icon: 'home', label: 'House Sold Nearby' },
    divorced: { icon: 'heart-broken', label: 'Recently Divorced' },
  };
  return eventMap[event as keyof typeof eventMap] || { icon: 'help', label: 'Unknown' };
};

const LeadDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { lead } = route.params;
  const lifeEvent = getLifeEventDisplay(lead.lifeEvent);

  const handleContactAction = (action: 'call' | 'text' | 'email'): void => {
    const actionMap = {
      call: 'call',
      text: 'send a text to',
      email: 'email',
    };

    Alert.alert(
      'Contact Lead',
      `This will ${actionMap[action]} the lead and open in another app. Are you sure?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Yes', 
          onPress: () => executeContactAction(action)
        },
      ]
    );
  };

  const executeContactAction = (action: 'call' | 'text' | 'email'): void => {
    const phone = lead.phone.replace(/[^\d]/g, '');
    
    switch (action) {
      case 'call':
        Linking.openURL(`tel:${phone}`);
        break;
      case 'text':
        Linking.openURL(`sms:${phone}`);
        break;
      case 'email':
        Linking.openURL(`mailto:${lead.email}`);
        break;
    }
  };

  const handleExport = async (): Promise<void> => {
    const leadData = `
Lead Details:
Name: ${lead.name}
Phone: ${lead.phone}
Email: ${lead.email}
Address: ${lead.address}
Property Value: ${lead.propertyValue}
Client Type: ${lead.clientType}
Life Event: ${lifeEvent.label}
Price Range: ${lead.priceRange}
    `.trim();

    await Clipboard.setStringAsync(leadData);
    Alert.alert('Success', 'Lead details copied to clipboard!');
  };

  const handleBackNavigation = (): void => {
    Alert.alert(
      'Warning',
      'We don\'t save lead data. If you leave this page, the data will be lost. Are you sure?',
      [
        { text: 'Stay', style: 'cancel' },
        { 
          text: 'Leave', 
          onPress: () => navigation.navigate('GenerateLead')
        },
      ]
    );
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
        showCredits={true}
      />
      
      <View style={styles.content}>
        <View style={styles.resultIndicators}>
          <View style={styles.indicator}>
            <Text style={styles.indicatorSymbol}>{lead.priceRange}</Text>
            <Text style={styles.indicatorLabel}>Price Range</Text>
          </View>
          
          <View style={styles.indicator}>
            <Text style={styles.indicatorText}>{lead.clientType.toUpperCase()}</Text>
            <Text style={styles.indicatorLabel}>Client Type</Text>
          </View>
          
          <View style={styles.indicator}>
            <Ionicons name={lifeEvent.icon as any} size={24} color="#2196F3" />
            <Text style={styles.indicatorLabel}>{lifeEvent.label}</Text>
          </View>
        </View>

        <View style={styles.leadCard}>
          <Text style={styles.leadTitle}>Lead Details</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Name:</Text>
            <Text style={styles.detailValue}>{lead.name}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Phone:</Text>
            <Text style={styles.detailValue}>{lead.phone}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailValue}>{lead.email}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Address:</Text>
            <Text style={styles.detailValue}>{lead.address}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Property Value:</Text>
            <Text style={styles.detailValue}>{lead.propertyValue}</Text>
          </View>
        </View>

        <View style={styles.contactActions}>
          <Text style={styles.contactTitle}>Contact Lead</Text>
          <View style={styles.actionButtons}>
            <Pressable
              style={styles.actionButton}
              onPress={() => handleContactAction('call')}
              android_ripple={{ color: '#E8F5E8' }}
            >
              <Ionicons name="call" size={24} color="#4CAF50" />
              <Text style={styles.actionButtonText}>Call</Text>
            </Pressable>

            <Pressable
              style={styles.actionButton}
              onPress={() => handleContactAction('text')}
              android_ripple={{ color: '#E3F2FD' }}
            >
              <Ionicons name="chatbubble" size={24} color="#2196F3" />
              <Text style={styles.actionButtonText}>Text</Text>
            </Pressable>

            <Pressable
              style={styles.actionButton}
              onPress={() => handleContactAction('email')}
              android_ripple={{ color: '#FFF3E0' }}
            >
              <Ionicons name="mail" size={24} color="#FF9800" />
              <Text style={styles.actionButtonText}>Email</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.bottomActions}>
          <Pressable
            style={styles.exportButton}
            onPress={handleExport}
            android_ripple={{ color: '#E8F5E8' }}
          >
            <Text style={styles.exportButtonText}>Export to Clipboard</Text>
          </Pressable>

          <Pressable
            style={styles.backButton}
            onPress={handleBackNavigation}
            android_ripple={{ color: '#F5F5F5' }}
          >
            <Text style={styles.backButtonText}>Back to Generate</Text>
          </Pressable>
        </View>
      </View>
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
  resultIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  indicator: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    minWidth: 80,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  indicatorSymbol: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  indicatorText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 4,
    textAlign: 'center',
  },
  indicatorLabel: {
    fontSize: 10,
    color: '#757575',
    textAlign: 'center',
  },
  leadCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  leadTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#757575',
    flex: 1,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#424242',
    flex: 2,
  },
  contactActions: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 16,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    minWidth: 80,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#424242',
    marginTop: 4,
    fontWeight: '500',
  },
  bottomActions: {
    gap: 12,
  },
  exportButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  exportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  backButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default LeadDetailsScreen;
