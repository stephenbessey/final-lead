import React from 'react';
import { Animated } from 'react-native';
import { Lead } from './index';
import { ButtonState } from '../hooks/useButtonState';

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

export interface EnhancedGenerateButtonProps {
  readonly buttonState: ButtonState;
  readonly onGeneratePress: () => void;
  readonly onViewDetailsPress: () => void;
  readonly pulseValue: Animated.Value;
}

export interface ResponsiveButtonConfig {
  readonly minWidth: number;
  readonly maxWidth: number;
  readonly paddingHorizontal: number;
  readonly paddingVertical: number;
  readonly fontSize: number;
}

export interface ResponsiveMachineConfig {
  readonly minWidth: number;
  readonly maxWidth: number;
  readonly borderRadius: number;
  readonly borderWidth: number;
}