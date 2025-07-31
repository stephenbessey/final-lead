import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { ResponsiveLayout } from '../components/ResponsiveLayout';
import { AppHeader } from '../components/AppHeader';
import { ZipCodeInput } from '../components/ZipCodeInput';
import { useSmoothNavigation } from '../hooks/useSmoothNavigation';
import { validateZipCode } from '../validation/zipCodeValidation';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/theme';

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
  const [isZipCodeValid, setIsZipCodeValid] = useState(false);
  
  const { navigateImmediately } = useSmoothNavigation(navigation);

  const handleContinue = useCallback(() => {
    const validation = validateZipCode(zipCode);
    
    if (validation.isValid) {
      const tier = PRICING_TIERS.find(t => t.name === selectedTier);
      if (tier) {
        navigateImmediately('Confirmation', {
          tier: tier.name,
          zipCode: zipCode.trim(),
          price: tier.price,
        });
      }
    }
  }, [zipCode, selectedTier, navigateImmediately]);

  const handleMenuPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleProfilePress = useCallback(() => {
  }, []);

  const canContinue = isZipCodeValid && selectedTier;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <AppHeader 
        onSettingsPress={handleMenuPress}
        onProfilePress={handleProfilePress}
        showCredits={false}
        title="Choose Your Plan"
      />
      
      <ResponsiveLayout scrollable={true} contentPadding={true} showStatusBar={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Select Your Plan</Text>
          <Text style={styles.subtitle}>
            Choose the plan that best fits your lead generation needs
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
                {tier.name === 'Professional' && (
                  <View style={styles.recommendedBadge}>
                    <Text style={styles.recommendedText}>Recommended</Text>
                  </View>
                )}
                
                <Text style={[
                  styles.tierName,
                  selectedTier === tier.name && styles.selectedTierText,
                ]}>
                  {tier.name}
                </Text>
                
                <Text style={styles.tierCredits}>
                  {tier.credits} Credits/Month
                </Text>
                
                <Text style={[
                  styles.tierPrice,
                  selectedTier === tier.name && styles.selectedTierText,
                ]}>
                  ${tier.price.toFixed(2)}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.inputSection}>
            <ZipCodeInput
              value={zipCode}
              onChangeText={setZipCode}
              onValidationChange={setIsZipCodeValid}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[
              styles.continueButton,
              !canContinue && styles.disabledButton,
            ]}
            onPress={handleContinue}
            disabled={!canContinue}
          >
            <Text style={[
              styles.continueButtonText,
              !canContinue && styles.disabledButtonText,
            ]}>
              Continue
            </Text>
          </Pressable>
        </View>
      </ResponsiveLayout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  tiersContainer: {
    marginBottom: SPACING.xl,
  },
  tierCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.border,
    position: 'relative',
    ...SHADOWS.medium,
  },
  selectedTier: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  tierName: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  tierCredits: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  tierPrice: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  selectedTierText: {
    color: COLORS.primary,
  },
  recommendedBadge: {
    position: 'absolute',
    top: -8,
    right: SPACING.md,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  recommendedText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  inputSection: {
    marginBottom: SPACING.xl,
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingBottom: SPACING.lg,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    minHeight: 48,
    ...SHADOWS.large,
  },
  disabledButton: {
    backgroundColor: COLORS.textHint,
  },
  continueButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
    fontSize: 16,
  },
  disabledButtonText: {
    color: COLORS.white,
    opacity: 0.7,
  },
});

export default RegistrationScreen;
