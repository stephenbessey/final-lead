import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Lead } from '../../App';
import { useUser } from '../context/UserContext';
import { AppHeader } from '../components/AppHeader';
import { SlotMachine } from '../components/SlotMachine';

type GenerateLeadScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GenerateLead'>;

interface Props {
  navigation: GenerateLeadScreenNavigationProp;
}

const GenerateLeadScreen: React.FC<Props> = ({ navigation }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const { userData, useCredit } = useUser();

  const handleGeneratePress = (): void => {
    if (userData.credits <= 0) {
      showOutOfCreditsAlert();
      return;
    }

    const canGenerate = useCredit();
    if (canGenerate) {
      setIsSpinning(true);
    }
  };

  const handleLeadResult = (lead: Lead): void => {
    setIsSpinning(false);
    navigation.navigate('LeadDetails', { lead });
  };

  const showOutOfCreditsAlert = (): void => {
    Alert.alert(
      'Out of Credits',
      'You have no credits remaining. Would you like to purchase more credits at a premium rate?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Purchase Credits', 
          onPress: () => navigation.navigate('Settings') 
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
        <Text style={styles.title}>Generate Lead</Text>
        <Text style={styles.subtitle}>
          AI-powered lead generation based on life events
        </Text>

        <View style={styles.slotContainer}>
          <SlotMachine
            onResult={handleLeadResult}
            onGeneratePress={handleGeneratePress}
            isSpinning={isSpinning}
          />
        </View>

        {userData.credits <= 3 && (
          <View style={styles.warningContainer}>
            <Text style={styles.warningText}>
              ⚠️ You have {userData.credits} credits remaining
            </Text>
          </View>
        )}
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 40,
  },
  slotContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  warningContainer: {
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  warningText: {
    fontSize: 14,
    color: '#E65100',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default GenerateLeadScreen;
