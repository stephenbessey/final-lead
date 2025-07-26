import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { AppHeader } from '../components/AppHeader';

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
        <Text style={styles.subtitle}>
          Select the plan that best fits your lead generation needs
        </Text>

        <View style={styles.tiersContainer}>
          {PRICING_TIERS.map((tier) => (
            <Pressable
              key={tier.name}
              style={[
                styles.tierCard,
                selectedTier === tier.name && styles.selectedTier,
              ]}
              onPress={() => setSelectedTier(tier.name)}
            >
              <Text style={styles.tierName}>{tier.name}</Text>
              <Text style={styles.tierCredits}>{tier.credits} Credits</Text>
              <Text style={styles.tierPrice}>${tier.price}/month</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>ZIP Code</Text>
          <TextInput
            style={styles.input}
            value={zipCode}
            onChangeText={setZipCode}
            placeholder="Enter your ZIP code"
            keyboardType="numeric"
            maxLength={10}
          />
        </View>

        <Pressable
          style={[
            styles.continueButton,
            !zipCode.trim() && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={!zipCode.trim()}
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
  tiersContainer: {
    marginBottom: 32,
  },
  tierCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  selectedTier: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  tierName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 4,
  },
  tierCredits: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 4,
  },
  tierPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  inputContainer: {
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#424242',
    marginBottom: 8,
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
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegistrationScreen;