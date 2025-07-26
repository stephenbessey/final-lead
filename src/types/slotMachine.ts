import React from 'react';
import { Animated } from 'react-native';
import { Lead } from './index';

export interface SlotMachineProps {
  isSpinning: boolean;
  onResult: (lead: Lead) => void;
  onGeneratePress: () => void;
  disabled?: boolean;
  duration?: number;
}

export interface ReelProps {
  emojis: readonly string[];
  isSpinning: boolean;
  duration: number;
  delay: number;
  finalIndex: number;
}

export interface SlotMachineFrameProps {
  children: React.ReactNode;
}

export interface GenerateButtonProps {
  disabled: boolean;
  isSpinning: boolean;
  onPress: () => void;
}

export interface EnhancedGenerateButtonProps extends GenerateButtonProps {
  pulseValue: Animated.Value;
}