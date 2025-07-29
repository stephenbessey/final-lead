
import { ResponsiveButtonConfig, ResponsiveMachineConfig } from '../types/slotMachine';
import { DeviceDetection } from '../constants/theme';

class ResponsiveConfigServiceError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'ResponsiveConfigServiceError';
  }
}

export class ResponsiveConfigService {
  private static instance: ResponsiveConfigService;
  
  private constructor() {}
  
  static getInstance(): ResponsiveConfigService {
    if (!ResponsiveConfigService.instance) {
      ResponsiveConfigService.instance = new ResponsiveConfigService();
    }
    return ResponsiveConfigService.instance;
  }

  getButtonConfig(): ResponsiveButtonConfig {
    try {
      const isSmallDevice = DeviceDetection.isSmallDevice();
      
      return {
        minWidth: isSmallDevice ? 200 : 220,
        maxWidth: isSmallDevice ? 280 : 320,
        paddingHorizontal: isSmallDevice ? 16 : 24,
        paddingVertical: isSmallDevice ? 12 : 16,
        fontSize: isSmallDevice ? 16 : 18,
      };
    } catch (error) {
      throw new ResponsiveConfigServiceError(
        'Failed to generate button configuration', 
        'BUTTON_CONFIG_ERROR'
      );
    }
  }

  getMachineConfig(): ResponsiveMachineConfig {
    try {
      const isSmallDevice = DeviceDetection.isSmallDevice();
      
      return {
        minWidth: isSmallDevice ? 280 : 300,
        maxWidth: isSmallDevice ? 350 : 400,
        borderRadius: 24,
        borderWidth: 4,
      };
    } catch (error) {
      throw new ResponsiveConfigServiceError(
        'Failed to generate machine configuration',
        'MACHINE_CONFIG_ERROR'
      );
    }
  }
}