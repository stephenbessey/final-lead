import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Pressable, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { RootStackScreenProps } from '../types/navigation';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from '../constants/theme';

type Props = RootStackScreenProps<'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const isValidUsername = useCallback((name: string): boolean => {
    return name.trim().length >= 3;
  }, []);

  const handleLogin = useCallback(async (): Promise<void> => {
    if (!isValidUsername(username)) {
      Alert.alert('Invalid Username', 'Username must be at least 3 characters long.');
      return;
    }

    try {
      setIsLoading(true);
      
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      login(username.trim());
      navigation.navigate('Registration');
    } catch (error) {
      Alert.alert('Login Failed', 'Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [username, login, navigation, isValidUsername]);

  const handleUsernameChange = useCallback((text: string): void => {
    setUsername(text);
  }, []);

  const isButtonDisabled = !isValidUsername(username) || isLoading;

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Lead Generator</Text>
            <Text style={styles.subtitle}>Welcome Back</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={handleUsernameChange}
                placeholder="Enter your username"
                placeholderTextColor={COLORS.textHint}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                editable={!isLoading}
              />
            </View>

            <Pressable
              style={[
                styles.button,
                isButtonDisabled && styles.buttonDisabled,
              ]}
              onPress={handleLogin}
              disabled={isButtonDisabled}
              android_ripple={{ color: COLORS.primaryDark }}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Logging in...' : 'Continue'}
              </Text>
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={styles.description}>
              Generate high-quality leads based on life events and property data.
              Start your real estate prospecting journey today.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  content: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.xl,
    ...SHADOWS.medium,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.headline,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.title,
    color: COLORS.textSecondary,
  },
  form: {
    marginBottom: SPACING.xl,
  },
  inputContainer: {
    marginBottom: SPACING.lg,
  },
  label: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    ...TYPOGRAPHY.body,
    backgroundColor: COLORS.background,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  buttonDisabled: {
    backgroundColor: COLORS.textHint,
  },
  buttonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
  },
  footer: {
    alignItems: 'center',
  },
  description: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LoginScreen;