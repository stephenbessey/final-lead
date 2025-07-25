import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { AppHeader } from '../components/AppHeader';
import { validateZipCode } from '../validation/zipCodeValidation';

type RegistrationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Registration'>;

interface Props {
  navigation: RegistrationScreenNavigationProp;
}

const PRICING_TIERS = [
  { name: 'Basic', credits: 10, price: 29.99 },
  { name: 'Professional', credits: 25, price: 69.99 },
  { name: 'Premium', credits: 50, price: 119.99 },
];

const RegistrationScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedTier, setSelectedTier] = useState('Professional');
  const [zipCode, setZipCode] = useState('');

  const handleContinue = (): void => {
    if (zipCode.trim()) {
      const tier = PRICING_TIERS.find(t => t.name === selectedTier);
      if (tier) {
        navigation.navigate('Confirmation', {
          tier: tier.name,
          zipCode: zipCode.trim(),
          price: tier.price,
        });
      }
    }
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
        <Text style={styles.title}>Choose Your Plan</Text>
        <Text style={styles.subtitle}>Select monthly credits and target area</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Credit Tiers</Text>
          {PRICING_TIERS.map((tier) => (
            <Pressable
              key={tier.name}
              style={[
                styles.tierCard,
                selectedTier === tier.name && styles.tierCardSelected,
              ]}
              onPress={() => setSelectedTier(tier.name)}
              android_ripple={{ color: '#E3F2FD' }}
            >
              <View style={styles.tierHeader}>
                <Text style={styles.tierName}>{tier.name}</Text>
                <Text style={styles.tierPrice}>${tier.price}/mo</Text>
              </View>
              <Text style={styles.tierCredits}>{tier.credits} leads per month</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Target Zip Code</Text>
          <TextInput
            style={styles.input}
            value={zipCode}
            onChangeText={setZipCode}
            placeholder="Enter target zip code"
            keyboardType="numeric"
            maxLength={5}
          />
        </View>

        <Pressable
          style={[styles.continueButton, !zipCode.trim() && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!zipCode.trim()}
          android_ripple={{ color: '#1976D2' }}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 16,
  },
  tierCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tierCardSelected: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  tierName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242',
  },
  tierPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  tierCredits: {
    fontSize: 14,
    color: '#757575',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  continueButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RegistrationScreen;
