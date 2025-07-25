import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Lead } from '../../App';

interface SlotMachineProps {
  onResult: (lead: Lead) => void;
  onGeneratePress: () => void;
  isSpinning: boolean;
}

const PRICE_SYMBOLS = ['$', '$$', '$$$'];
const CLIENT_TYPES = ['BUYER', 'SELLER'];
const LIFE_EVENTS = ['baby', 'death', 'married', 'house-sold', 'divorced'];

const getLifeEventIcon = (event: string) => {
  const iconMap = {
    baby: 'baby',
    death: 'flower',
    married: 'heart',
    'house-sold': 'home',
    divorced: 'heart-broken',
  };
  return iconMap[event as keyof typeof iconMap] || 'help';
};

export const SlotMachine: React.FC<SlotMachineProps> = ({ 
  onResult, 
  onGeneratePress,
  isSpinning 
}) => {
  const [currentSymbols, setCurrentSymbols] = useState({
    price: '$',
    client: 'BUYER',
    event: 'baby',
  });

  const spinAnimation1 = useRef(new Animated.Value(0)).current;
  const spinAnimation2 = useRef(new Animated.Value(0)).current;
  const spinAnimation3 = useRef(new Animated.Value(0)).current;

  const generateRandomLead = (): Lead => {
    const priceRange = PRICE_SYMBOLS[Math.floor(Math.random() * PRICE_SYMBOLS.length)] as '$' | '$$' | '$$$';
    const clientType = CLIENT_TYPES[Math.floor(Math.random() * CLIENT_TYPES.length)].toLowerCase() as 'buyer' | 'seller';
    const lifeEvent = LIFE_EVENTS[Math.floor(Math.random() * LIFE_EVENTS.length)] as Lead['lifeEvent'];

    return {
      id: Math.random().toString(36).substr(2, 9),
      name: `${['John', 'Jane', 'Mike', 'Sarah', 'David'][Math.floor(Math.random() * 5)]} ${['Smith', 'Johnson', 'Williams', 'Brown', 'Davis'][Math.floor(Math.random() * 5)]}`,
      phone: `(555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      email: 'contact@example.com',
      address: `${Math.floor(100 + Math.random() * 9900)} Main St, City, State`,
      propertyValue: `$${Math.floor(200000 + Math.random() * 800000).toLocaleString()}`,
      lifeEvent,
      clientType,
      priceRange,
    };
  };

  const startSpinning = (): void => {
    const duration = 3000;
    
    Animated.parallel([
      Animated.timing(spinAnimation1, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.timing(spinAnimation2, {
        toValue: 1,
        duration: duration + 200,
        useNativeDriver: true,
      }),
      Animated.timing(spinAnimation3, {
        toValue: 1,
        duration: duration + 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      const lead = generateRandomLead();
      setCurrentSymbols({
        price: lead.priceRange,
        client: lead.clientType.toUpperCase(),
        event: lead.lifeEvent,
      });
      
      spinAnimation1.setValue(0);
      spinAnimation2.setValue(0);
      spinAnimation3.setValue(0);
      
      onResult(lead);
    });
  };

  const handleGenerate = (): void => {
    onGeneratePress();
    if (!isSpinning) {
      startSpinning();
    }
  };

  const spin1 = spinAnimation1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1440deg'],
  });

  const spin2 = spinAnimation2.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1440deg'],
  });

  const spin3 = spinAnimation3.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1440deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.slotContainer}>
        <Animated.View 
          style={[
            styles.column, 
            { transform: [{ rotateY: spin1 }] }
          ]}
        >
          <Text style={styles.symbol}>{currentSymbols.price}</Text>
        </Animated.View>

        <Animated.View 
          style={[
            styles.column, 
            { transform: [{ rotateY: spin2 }] }
          ]}
        >
          <Text style={styles.clientText}>{currentSymbols.client}</Text>
        </Animated.View>

        <Animated.View 
          style={[
            styles.column, 
            { transform: [{ rotateY: spin3 }] }
          ]}
        >
          <Ionicons 
            name={getLifeEventIcon(currentSymbols.event) as any} 
            size={40} 
            color="#2196F3" 
          />
        </Animated.View>
      </View>

      <Pressable
        style={[styles.generateButton, isSpinning && styles.generateButtonDisabled]}
        onPress={handleGenerate}
        disabled={isSpinning}
        android_ripple={{ color: '#1976D2' }}
      >
        <Text style={styles.generateButtonText}>
          {isSpinning ? 'GENERATING...' : 'GENERATE LEAD'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  slotContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  column: {
    width: 80,
    height: 80,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  symbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  clientText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
  },
  generateButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  generateButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});