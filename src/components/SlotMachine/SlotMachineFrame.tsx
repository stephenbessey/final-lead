import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SlotMachineFrameProps } from '../../types/slotMachine';
import { MachineDecorations } from './MachineDecorations';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, DeviceDetection } from '../../constants/theme';
import { SLOT_MACHINE_TEXTS, SLOT_MACHINE_CONFIG } from '../../constants/slotMachine';

class FrameStyleCalculator {
  static getFrameStyle() {
    const config = SLOT_MACHINE_CONFIG.machine;
    const isSmallDevice = DeviceDetection.isSmallDevice();
    
    return {
      backgroundColor: COLORS.surface,
      borderRadius: config.borderRadius,
      padding: isSmallDevice ? SPACING.md : SPACING.lg,
      ...SHADOWS.large,
      borderWidth: config.borderWidth,
      borderColor: COLORS.primary,
      minWidth: config.minWidth,
      maxWidth: config.maxWidth,
      alignSelf: 'center' as const,
      marginHorizontal: SPACING.sm,
    };
  }

  static getHeaderStyle() {
    const isSmallDevice = DeviceDetection.isSmallDevice();
    
    return {
      backgroundColor: COLORS.primary,
      borderRadius: 12,
      padding: isSmallDevice ? SPACING.xs : SPACING.sm,
      marginBottom: isSmallDevice ? SPACING.md : SPACING.lg,
    };
  }

  static getTitleStyle() {
    const isSmallDevice = DeviceDetection.isSmallDevice();
    
    return {
      ...TYPOGRAPHY.caption,
      color: COLORS.white,
      textAlign: 'center' as const,
      fontWeight: 'bold' as const,
      fontSize: isSmallDevice ? 12 : 14,
    };
  }

  static getReelsContainerStyle() {
    const isSmallDevice = DeviceDetection.isSmallDevice();
    
    return {
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      backgroundColor: COLORS.background,
      borderRadius: 16,
      padding: isSmallDevice ? SPACING.sm : SPACING.md,
      gap: isSmallDevice ? SPACING.xs : SPACING.sm,
    };
  }
}

export const SlotMachineFrame: React.FC<SlotMachineFrameProps> = ({ children }) => {
  const frameStyle = FrameStyleCalculator.getFrameStyle();
  const headerStyle = FrameStyleCalculator.getHeaderStyle();
  const titleStyle = FrameStyleCalculator.getTitleStyle();
  const reelsContainerStyle = FrameStyleCalculator.getReelsContainerStyle();
  
  return (
    <View style={frameStyle}>
      <View style={headerStyle}>
        <Text style={titleStyle}>
          {SLOT_MACHINE_TEXTS.machineTitle}
        </Text>
      </View>
      
      <View style={reelsContainerStyle}>
        {children}
      </View>
      
      <MachineDecorations />
    </View>
  );
};
