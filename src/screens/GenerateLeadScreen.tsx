import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../context/UserContext';
import { useButtonState, ButtonState } from '../hooks/useButtonState';
import { AppHeader } from '../components/AppHeader';
import { SlotMachine } from '../components/SlotMachine';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { ErrorMessage } from '../components/ErrorMessage';
import { RootStackScreenProps } from '../types/navigation';
import { Lead } from '../types';
import { COLORS, TYPOGRAPHY, SPACING } from '../constants/theme';

type Props = RootStackScreenProps<'GenerateLead'>;

const GenerateLeadScreen: React.FC<Props> = ({ navigation }) => {
  const { userData, useCredit, isLoading, error, resetError, isInitialized } = useUser();
  
  const handleGenerate = useCallback((): boolean => {
    if (userData.credits <= 0) {
      showOutOfCreditsAlert();
      return false;
    }

    const canGenerate = useCredit();
    if (canGenerate) {
      resetError();
    }
    return canGenerate;
  }, [userData.credits, useCredit, resetError]);

  const handleViewDetails = useCallback((lead: Lead): void => {
    navigation.navigate('LeadDetails', { lead });
  }, [navigation]);

  const {
    buttonState,
    handleGeneratePress,
    handleLeadGenerated,
    resetToGenerate,
    handleViewDetailsPress
  } = useButtonState(
    userData.credits > 0,
    handleGenerate,
    handleViewDetails
  );

  useEffect(() => {
    if (userData.credits <= 0 && buttonState !== ButtonState.NO_CREDITS) {
      resetToGenerate();
    }
  }, [userData.credits, buttonState, resetToGenerate]);

  const showOutOfCreditsAlert = useCallback((): void => {
    Alert.alert(
      'Out of Credits',
      'You have no credits remaining. Would you like to purchase more credits?',
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

  const renderCreditWarning = (): React.ReactNode => {
    const warningMessage = getCreditWarningMessage();
    if (!warningMessage) return null;

    const isCritical = userData.credits <= 0;
    
    return (
      <View style={[
        styles.warningContainer,
        isCritical && styles.criticalWarningContainer,
      ]}>
        <Text style={[
          styles.warningText,
          isCritical && styles.criticalWarningText,
        ]}>
          {warningMessage}
        </Text>
      </View>
    );
  };

  if (!isInitialized) {
    return <LoadingOverlay visible={true} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <AppHeader 
        onMenuPress={handleMenuPress}
        onProfilePress={handleProfilePress}
        showCredits={true}
        credits={userData.credits}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>Generate Your Lead</Text>
        <Text style={styles.subtitle}>
          Spin the slot machine to discover your next potential client
        </Text>

        {error && (
          <View style={styles.errorContainer}>
            <ErrorMessage message={error} onDismiss={resetError} />
          </View>
        )}

        <View style={styles.slotContainer}>
          <SlotMachine
            buttonState={buttonState}
            onGeneratePress={handleGeneratePress}
            onViewDetailsPress={handleViewDetailsPress}
            onLeadGenerated={handleLeadGenerated}
          />
        </View>
      </View>
      <LoadingOverlay visible={isLoading} />
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
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
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