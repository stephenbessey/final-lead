import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { validateZipCode } from '../validation/zipCodeValidation';
import { COLORS, TYPOGRAPHY, SPACING } from '../constants/theme';

interface ZipCodeInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  showError?: boolean;
  disabled?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

const formatZipCode = (input: string): string => {
  const digitsOnly = input.replace(/\D/g, '');
  
  const limited = digitsOnly.slice(0, 9);
  
  if (limited.length > 5) {
    return `${limited.slice(0, 5)}-${limited.slice(5)}`;
  }
  
  return limited;
};

const isValidZipCodeInput = (input: string): boolean => {
  const digitsOnly = input.replace(/\D/g, '');
  return digitsOnly.length <= 9 && /^\d*$/.test(digitsOnly);
};

export const ZipCodeInput: React.FC<ZipCodeInputProps> = ({
  value,
  onChangeText,
  placeholder = "Enter your ZIP code",
  label = "ZIP Code",
  showError = true,
  disabled = false,
  onValidationChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasBeenBlurred, setHasBeenBlurred] = useState(false);

  const handleChangeText = useCallback((text: string) => {
    if (isValidZipCodeInput(text)) {
      const formatted = formatZipCode(text);
      onChangeText(formatted);
      
      if (onValidationChange) {
        const validation = validateZipCode(formatted);
        onValidationChange(validation.isValid);
      }
    }
  }, [onChangeText, onValidationChange]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setHasBeenBlurred(true);
  }, []);

  const shouldShowError = showError && hasBeenBlurred && !isFocused;
  const validation = validateZipCode(value);
  const hasError = shouldShowError && !validation.isValid && value.length > 0;

  const inputStyle = [
    styles.input,
    isFocused && styles.inputFocused,
    hasError && styles.inputError,
    disabled && styles.inputDisabled,
  ];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TextInput
        style={inputStyle}
        value={value}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textHint}
        keyboardType="number-pad" 
        maxLength={10} 
        autoComplete="postal-code"
        textContentType="postalCode"
        returnKeyType="done"
        editable={!disabled}
        selectTextOnFocus
      />
      
      {hasError && (
        <View style={styles.errorContainer}>
          {validation.errors.map((error, index) => (
            <Text key={index} style={styles.errorText}>
              {error}
            </Text>
          ))}
        </View>
      )}
      
      {isFocused && (
        <Text style={styles.helperText}>
          Enter a 5-digit ZIP code or ZIP+4 format
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
    fontWeight: '500',
  },
  input: {
    ...TYPOGRAPHY.body,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    minHeight: 48,
    color: COLORS.textPrimary,
  },
  inputFocused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: COLORS.error,
    borderWidth: 2,
  },
  inputDisabled: {
    backgroundColor: COLORS.backgroundSecondary,
    color: COLORS.textHint,
  },
  errorContainer: {
    marginTop: SPACING.xs,
  },
  errorText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
  },
  helperText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
});