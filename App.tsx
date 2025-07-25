import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './src/context/AuthContext';
import { UserProvider } from './src/context/UserContext';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import ConfirmationScreen from './src/screens/ConfirmationScreen';
import GenerateLeadScreen from './src/screens/GenerateLeadScreen';
import LeadDetailsScreen from './src/screens/LeadDetailsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
  Confirmation: { tier: string; zipCode: string; price: number };
  GenerateLead: undefined;
  LeadDetails: { lead: Lead };
  Settings: undefined;
};

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  propertyValue: string;
  lifeEvent: 'baby' | 'death' | 'married' | 'house-sold' | 'divorced';
  clientType: 'buyer' | 'seller';
  priceRange: '$' | '$$' | '$$$';
}

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
            <Stack.Screen name="GenerateLead" component={GenerateLeadScreen} />
            <Stack.Screen name="LeadDetails" component={LeadDetailsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </AuthProvider>
  );
}