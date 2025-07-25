import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Lead } from '../types';
import { generateRandomLead } from '../utils/leadGenerator';

const SIMPLE_COLORS = {
  primary: '#2196F3',
  secondary: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  surface: '#FFFFFF',
  textOnPrimary: '#FFFFFF',
  primaryLight: '#E3F2FD',
  textLight: '#BDBDBD',
  border: '#E0E0E0',
};

const SIMPLE_SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

interface SlotMachineProps {
  onResult: (lead: Lead) => void;
  onGeneratePress: () => void;
  isSpinning: boolean;
  disabled?: boolean;
}

interface SlotSymbol {
  value: string;
  icon?: string;
  color?: string;
}

const PRICE_SYMBOLS: SlotSymbol[] = [
  { value: '$', color: SIMPLE_COLORS.secondary },
  { value: '$$', color: SIMPLE_COLORS.warning },
  { value: '$$$', color: SIMPLE_COLORS.error },
];

const CLIENT_TYPES: SlotSymbol[] = [
  { value: 'BUYER', icon: 'home', color: SIMPLE_COLORS.primary },
  { value: 'SELLER', icon: 'business', color: SIMPLE_COLORS.secondary },
];

const LIFE_EVENTS: SlotSymbol[] = [
  { value: 'baby', icon: 'child-care', color: '#FF6B9D' },
  { value: 'death', icon: 'local-florist', color: '#8E44AD' },
  { value: 'married', icon: 'favorite', color: '#E74C3C' },
  { value: 'house-sold', icon: 'home', color: '#3498DB' },
  { value: 'divorced', icon: 'heart-broken', color: '#95A5A6' },
];

const SPIN_DURATION = 3000;

export const SlotMachine: React.FC<SlotMachineProps> = ({ 
  onResult, 
  onGeneratePress,
  isSpinning,
  disabled = false,
}) => {
  const [currentSymbols, setCurrentSymbols] = useState({
    price: PRICE_SYMBOLS[0],
    client: CLIENT_TYPES[0],
    event: LIFE_EVENTS[0],
  });

  const spinAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const pulseAnimation = useRef(new Animated.Value(1)).current;

  const generateFinalLead = useCallback((): Lead => {
    const priceRange = currentSymbols.price.value as '$' | '$$' | '$$$';
    const clientType = currentSymbols.client.value.toLowerCase() as 'buyer' | 'seller';
    const lifeEvent = currentSymbols.event.value as Lead['lifeEvent'];

    const lead = generateRandomLead();
    return {
      ...lead,
      priceRange,
      clientType,
      lifeEvent,
    };
  }, [currentSymbols]);

  const startSpinning = useCallback((): void => {
    spinAnimations.forEach(anim => anim.setValue(0));

    const animations = spinAnimations.map((anim, index) => 
      Animated.timing(anim, {
        toValue: 1,
        duration: SPIN_DURATION + (index * 200),
        useNativeDriver: true,
      })
    );

    Animated.stagger(100, animations).start(() => {
      const finalPrice = PRICE_SYMBOLS[Math.floor(Math.random() * PRICE_SYMBOLS.length)];
      const finalClient = CLIENT_TYPES[Math.floor(Math.random() * CLIENT_TYPES.length)];
      const finalEvent = LIFE_EVENTS[Math.floor(Math.random() * LIFE_EVENTS.length)];

      setCurrentSymbols({
        price: finalPrice,
        client: finalClient,
        event: finalEvent,
      });

      spinAnimations.forEach(anim => anim.setValue(0));

      setTimeout(() => {
        const lead = generateFinalLead();
        onResult(lead);
      }, 500);
    });
  }, [spinAnimations, generateFinalLead, onResult]);

  const handleGenerate = useCallback((): void => {
    if (disabled || isSpinning) return;
    
    onGeneratePress();
    startSpinning();
  }, [disabled, isSpinning, onGeneratePress, startSpinning]);

  useEffect(() => {
    if (!isSpinning && !disabled) {
      const pulse = Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.05,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]);

      const loop = Animated.loop(pulse, { iterations: -1 });
      loop.start();

      return () => loop.stop();
    }
  }, [isSpinning, disabled, pulseAnimation]);

  const renderReel = (
    symbols: SlotSymbol[], 
    currentSymbol: SlotSymbol, 
    animatedValue: Animated.Value,
    testID: string
  ) => {
    const spinTransform = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '720deg'],
    });

    return (
      <View style={styles.reel} testID={testID}>
        <Animated.View 
          style={[
            styles.reelContent,
            {
              transform: [{ rotateX: spinTransform }],
            },
          ]}
        >
          <View style={styles.symbolContainer}>
            {currentSymbol.icon ? (
              <MaterialIcons 
                // @ts-ignore - MaterialIcons type issue
                name={currentSymbol.icon}
                size={32} 
                color={currentSymbol.color || SIMPLE_COLORS.primary}
              />
            ) : (
              <Text style={[styles.symbolText, { color: currentSymbol.color }]}>
                {currentSymbol.value}
              </Text>
            )}
          </View>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.machine}>
        <View style={styles.display}>
          <Text style={styles.displayTitle}>Lead Generator</Text>
          
          <View style={styles.reelsContainer}>
            {renderReel(
              PRICE_SYMBOLS, 
              currentSymbols.price, 
              spinAnimations[0],
              'price-reel'
            )}
            {renderReel(
              CLIENT_TYPES, 
              currentSymbols.client, 
              spinAnimations[1],
              'client-reel'
            )}
            {renderReel(
              LIFE_EVENTS, 
              currentSymbols.event, 
              spinAnimations[2],
              'event-reel'
            )}
          </View>

          <View style={styles.labels}>
            <Text style={styles.label}>Price</Text>
            <Text style={styles.label}>Type</Text>
            <Text style={styles.label}>Event</Text>
          </View>
        </View>

        <Animated.View style={{ transform: [{ scale: pulseAnimation }] }}>
          <Pressable
            style={[
              styles.generateButton,
              (disabled || isSpinning) && styles.generateButtonDisabled,
            ]}
            onPress={handleGenerate}
            disabled={disabled || isSpinning}
            testID="generate-button"
            android_ripple={{ 
              color: SIMPLE_COLORS.primaryLight,
              borderless: false,
            }}
          >
            <View style={styles.buttonContent}>
              {isSpinning ? (
                <>
                  <Animated.View
                    style={[
                      styles.buttonIcon,
                      {
                        transform: [{
                          rotate: spinAnimations[0].interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg'],
                          }),
                        }],
                      },
                    ]}
                  >
                    <MaterialIcons name="refresh" size={24} color={SIMPLE_COLORS.textOnPrimary} />
                  </Animated.View>
                  <Text style={styles.generateButtonText}>Generating...</Text>
                </>
              ) : (
                <>
                  <MaterialIcons 
                    name="casino" 
                    size={24} 
                    color={SIMPLE_COLORS.textOnPrimary}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.generateButtonText}>
                    {disabled ? 'No Credits' : 'Generate Lead'}
                  </Text>
                </>
              )}
            </View>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIMPLE_SPACING.xl,
  },
  machine: {
    backgroundColor: SIMPLE_COLORS.surface,
    borderRadius: 16,
    padding: SIMPLE_SPACING.xl,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 3,
    borderColor: SIMPLE_COLORS.primary,
  },
  display: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: SIMPLE_SPACING.lg,
    marginBottom: SIMPLE_SPACING.lg,
  },
  displayTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: SIMPLE_COLORS.primary,
    textAlign: 'center',
    marginBottom: SIMPLE_SPACING.md,
    fontFamily: 'monospace',
  },
  reelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SIMPLE_SPACING.md,
  },
  reel: {
    width: 80,
    height: 80,
    backgroundColor: SIMPLE_COLORS.surface,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: SIMPLE_COLORS.border,
  },
  reelContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbolContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbolText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  label: {
    fontSize: 12,
    color: SIMPLE_COLORS.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  generateButton: {
    backgroundColor: SIMPLE_COLORS.primary,
    borderRadius: 12,
    paddingVertical: SIMPLE_SPACING.md,
    paddingHorizontal: SIMPLE_SPACING.xl,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  generateButtonDisabled: {
    backgroundColor: SIMPLE_COLORS.textLight,
    elevation: 0,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: SIMPLE_SPACING.sm,
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: SIMPLE_COLORS.textOnPrimary,
  },
});