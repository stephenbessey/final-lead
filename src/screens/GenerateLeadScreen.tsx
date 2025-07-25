import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useUser } from '../context/UserContext';
import { AppHeader } from '../components/AppHeader';
import { SlotMachine } from '../components/SlotMachine';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { ErrorMessage } from '../components/ErrorMessage';
import { RootStackScreenProps } from '../types/navigation';
import { Lead } from '../types';
import { COLORS, TYPOGRAPHY, SPACING } from '../constants/theme';

type Props = RootStackScreenProps<'GenerateLead'>;

const GenerateLeadScreen: React.FC<Props> = ({ navigation }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const { userData, useCredit, isLoading, error, resetError } = useUser();

  const handleGeneratePress = useCallback((): void => {
    if (userData.credits <= 0) {
      showOutOfCreditsAlert();
      return;
    }

    const canGenerate = useCredit();
    if (canGenerate) {
      setIsSpinning(true);
      resetError(); 
    }
  }, [userData.credits, useCredit, resetError]);

  const handleLeadResult = useCallback((lead: Lead): void => {
    setIsSpinning(false);
    navigation.navigate('LeadDetails', { lead });
  }, [navigation]);

  const showOutOfCreditsAlert = useCallback((): void => {
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
  }, [navigation]);

  const handleMenuPress = useCallback((): void => {
    navigation.navigate('Settings');
  }, [navigation]);

  const handleProfilePress = useCallback((): void => {
    Alert.alert('Profile', 'Profile functionality coming soon!');
  }, []);

  const getCreditWarningMessage = (): string | null => {
    if (userData.credits <= 0) {
      return 'You have no credits remaining';
    }
    if (userData.credits <= 3) {
      return `⚠️ You have ${userData.credits} credit${userData.credits === 1 ? '' : 's'} remaining`;
    }
    return null;
  };

  const warningMessage = getCreditWarningMessage();

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

        {error && (
          <ErrorMessage 
            message={error} 
            onDismiss={resetError}
            style={styles.errorContainer}
          />
        )}

        <View style={styles.slotContainer}>
          <SlotMachine
            onResult={handleLeadResult}
            onGeneratePress={handleGeneratePress}
            isSpinning={isSpinning}
            disabled={userData.credits <= 0 || isLoading}
          />
        </View>

        {warningMessage && (
          <View style={[
            styles.warningContainer,
            userData.credits === 0 && styles.criticalWarningContainer
          ]}>
            <Text style={[
              styles.warningText,
              userData.credits === 0 && styles.criticalWarningText
            ]}>
              {warningMessage}
            </Text>
          </View>
        )}

        {userData.credits > 0 && userData.credits <= 5 && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              💡 Consider upgrading your plan for more credits and better value
            </Text>
          </View>
        )}
      </View>

      {isLoading && (
        <LoadingOverlay message="Processing your request..." />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    justifyContent: 'center',
  },
  title: {
    ...TYPOGRAPHY.headline,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  slotContainer: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 300,
  },
  errorContainer: {
    marginBottom: SPACING.md,
  },
  warningContainer: {
    backgroundColor: COLORS.warningLight,
    borderRadius: 8,
    padding: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
    marginTop: SPACING.md,
  },
  criticalWarningContainer: {
    backgroundColor: COLORS.errorLight,
    borderLeftColor: COLORS.error,
  },
  warningText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.warning,
    textAlign: 'center',
    fontWeight: '500',
  },
  criticalWarningText: {
    color: COLORS.error,
  },
  infoContainer: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    padding: SPACING.md,
    marginTop: SPACING.sm,
  },
  infoText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    textAlign: 'center',
  },
});

export default GenerateLeadScreen;