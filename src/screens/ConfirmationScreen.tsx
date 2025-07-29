import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { useUser } from '../context/UserContext';
import { AppHeader } from '../components/AppHeader';

type ConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Confirmation'>;
type ConfirmationScreenRouteProp = RouteProp<RootStackParamList, 'Confirmation'>;

interface Props {
  navigation: ConfirmationScreenNavigationProp;
  route: ConfirmationScreenRouteProp;
}

const ConfirmationScreen: React.FC<Props> = ({ navigation, route }) => {
  const { tier, zipCode, price } = route.params;
  const { updateUserData } = useUser();

  const handleAgreeAndPurchase = (): void => {
    const creditMap = {
      'Basic': 10,
      'Professional': 25,
      'Premium': 50,
    };

    updateUserData({
      credits: creditMap[tier as keyof typeof creditMap],
      tier,
      zipCode,
      monthlyPrice: price,
    });

    navigation.navigate('GenerateLead');
  };

  const handleMenuPress = (): void => {
    navigation.navigate('Settings');
  };

  const handleProfilePress = (): void => {
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <AppHeader 
        onMenuPress={handleMenuPress}
        onProfilePress={handleProfilePress}
        showCredits={false}
      />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Confirm Your Purchase</Text>
        <Text style={styles.subtitle}>Review your plan details</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Plan:</Text>
            <Text style={styles.summaryValue}>{tier}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Target Area:</Text>
            <Text style={styles.summaryValue}>{zipCode}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Monthly Price:</Text>
            <Text style={styles.summaryPrice}>${price}</Text>
          </View>
        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.termsTitle}>Terms and Conditions</Text>
          <View style={styles.termsContent}>
            <Text style={styles.termsText}>
              • Subscription automatically renews monthly{'\n'}
              • Credits expire at the end of each billing cycle{'\n'}
              • Lead data is not stored on our servers{'\n'}
              • You may cancel your subscription at any time{'\n'}
              • Refunds are not available for unused credits{'\n'}
              • Lead accuracy is not guaranteed{'\n'}
              • Use of leads must comply with local real estate laws
            </Text>
          </View>
        </View>

        <Pressable
          style={styles.purchaseButton}
          onPress={handleAgreeAndPurchase}
          android_ripple={{ color: '#1976D2' }}
        >
          <Text style={styles.purchaseButtonText}>Agree and Purchase</Text>
        </Pressable>

        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          android_ripple={{ color: '#F5F5F5' }}
        >
          <Text style={styles.backButtonText}>Back to Plan Selection</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
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
  summaryCard: {
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
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#757575',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#424242',
  },
  summaryPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  termsContainer: {
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
  termsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 12,
  },
  termsContent: {
    backgroundColor: '#F5F5F5',
    borderRadius: 6,
    padding: 16,
  },
  termsText: {
    fontSize: 14,
    color: '#616161',
    lineHeight: 20,
  },
  purchaseButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  purchaseButtonText: {
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

export default ConfirmationScreen;