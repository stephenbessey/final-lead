
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SlotMachineFrameProps } from '../../types/slotMachine';
import { MachineDecorations } from './MachineDecorations';
import { ResponsiveConfigService } from '../../services/ResponsiveConfigService';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, DeviceDetection } from '../../constants/theme';
import { SLOT_MACHINE_TEXTS } from '../../constants/slotMachine';

class FrameStyleCalculator {
  private static configService = ResponsiveConfigService.getInstance();
  
  static getFrameStyle() {
    const config = this.configService.getMachineConfig();
    const isSmallDevice = DeviceDetection.isSmallDevice();
    
    return [
      styles.baseFrame,
      {
        borderRadius: config.borderRadius,
        borderWidth: config.borderWidth,
        padding: isSmallDevice ? SPACING.md : SPACING.lg,
        minWidth: config.minWidth,
        maxWidth: config.maxWidth,
      }
    ];
  }

  static getHeaderStyle() {
    const isSmallDevice = DeviceDetection.isSmallDevice();
    
    return [
      styles.baseHeader,
      {
        padding: isSmallDevice ? SPACING.xs : SPACING.sm,
        marginBottom: isSmallDevice ? SPACING.md : SPACING.lg,
      }
    ];
  }

  static getTitleStyle() {
    const isSmallDevice = DeviceDetection.isSmallDevice();
    
    return [
      styles.baseTitle,
      {
        fontSize: isSmallDevice ? 12 : 14,
      }
    ];
  }

  static getReelsContainerStyle() {
    const isSmallDevice = DeviceDetection.isSmallDevice();
    
    return [
      styles.baseReelsContainer,
      {
        padding: isSmallDevice ? SPACING.sm : SPACING.md,
        gap: isSmallDevice ? SPACING.xs : SPACING.sm,
      }
    ];
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

const styles = StyleSheet.create({
  baseFrame: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.primary,
    alignSelf: 'center',
    marginHorizontal: SPACING.sm,
    ...SHADOWS.large,
  },
  baseHeader: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  baseTitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  baseReelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    borderRadius: 16,
  },
});