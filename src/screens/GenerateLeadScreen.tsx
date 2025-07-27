import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { ResponsiveLayout } from '../components/ResponsiveLayout';
import { AppHeader } from '../components/AppHeader';
import { SlotMachine } from '../components/SlotMachine';
import { ErrorMessage } from '../components/ErrorMessage';
import { useAuth } from '../hooks/useAuth';
import { useUser } from '../hooks/useUser';
import { useSmoothNavigation } from '../hooks/useSmoothNavigation';
import { Lead } from '../types';
import { COLORS, TYPOGRAPHY, SPACING } from '../constants/theme';

type GenerateLeadScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GenerateLead'>;

interface Props {
  navigation: GenerateLeadScreenNavigationProp;
}

const GenerateLeadScreen: React.FC<Props> = ({ navigation }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  const { credits, updateCredits } = useUser();
  const { navigateWithDelay, navigateImmediately, fadeAnim } = useSmoothNavigation(navigation);

  const handleMenuPress = useCallback(() => {
    navigateImmediately('Settings');
  }, [navigateImmediately]);

  const handleProfilePress = useCallback(() => {
  }, []);

  const handleGeneratePress = useCallback(() => {
    if (credits <= 0) {
      Alert.alert(
        'No Credits Available',
        'You need credits to generate leads. Would you like to upgrade your plan?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Upgrade', onPress: () => navigateImmediately('Settings') },
        ]
      );
      return;
    }

    setError(null);
    setIsSpinning(true);
  }, [credits, navigateImmediately]);

  const handleLeadResult = useCallback((lead: Lead) => {
    try {
      updateCredits(credits - 1);
      
      setIsSpinning(false);
      
      Alert.alert(
        'Lead Generated!',
        'Your new lead is ready. Would you like to view the details now?',
        [
          { 
            text: 'View Later', 
            style: 'cancel',
            onPress: () => {
            }
          },
          { 
            text: 'View Details', 
            onPress: () => navigateWithDelay('LeadDetails', { lead }, 500)
          },
        ]
      );
    } catch (err) {
      setError('Failed to generate lead. Please try again.');
      setIsSpinning(false);
    }
  }, [credits, updateCredits, navigateWithDelay]);

  const getCreditWarningLevel = (): 'none' | 'warning' | 'critical' => {
    if (credits <= 0) return 'critical';
    if (credits <= 3) return 'warning';
    return 'none';
  };

  const renderCreditWarning = () => {
    const warningLevel = getCreditWarningLevel();
    
    if (warningLevel === 'none') return null;

    const isCritical = warningLevel === 'critical';
    const message = isCritical 
      ? 'You have no credits remaining. Upgrade your plan to continue generating leads.'
      : `You have ${credits} credit${credits === 1 ? '' : 's'} remaining. Consider upgrading soon.`;

    return (
      <View style={[
        styles.warningContainer,
        isCritical && styles.criticalWarningContainer,
      ]}>
        <Text style={[
          styles.warningText,
          isCritical && styles.criticalWarningText,
        ]}>
          {message}
        </Text>
      </View>
    );
  };

  return (
    <ResponsiveLayout scrollable edges={['top', 'left', 'right', 'bottom']}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <AppHeader 
          onMenuPress={handleMenuPress}
          onProfilePress={handleProfilePress}
          showCredits={true}
          credits={credits}
        />
        
        <View style={styles.content}>
          <Text style={styles.title}>Generate Lead</Text>
          <Text style={styles.subtitle}>
            Spin the wheel to discover your next potential client
          </Text>

          {error && (
            <View style={styles.errorContainer}>
              <ErrorMessage message={error} onDismiss={() => setError(null)} />
            </View>
          )}

          {renderCreditWarning()}

          <View style={styles.slotContainer}>
            <SlotMachine
              isSpinning={isSpinning}
              onResult={handleLeadResult}
              onGeneratePress={handleGeneratePress}
              disabled={credits <= 0}
              duration={3500} 
            />
          </View>

          {!isSpinning && credits > 0 && (
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                Each spin costs 1 credit and generates a qualified lead based on recent life events
              </Text>
            </View>
          )}
        </View>
      </Animated.View>
    </ResponsiveLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.h1,
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
    minHeight: 400, 
    paddingVertical: SPACING.lg,
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
    marginBottom: SPACING.md,
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