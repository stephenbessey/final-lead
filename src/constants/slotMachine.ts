import { DeviceDetection, ResponsiveSpacing } from './theme';

class SlotMachineConfiguration {
  private static getDeviceMultiplier(): number {
    const deviceType = DeviceDetection.getDeviceType();
    return { small: 0.8, medium: 0.9, large: 1.0 }[deviceType];
  }

  static get animation() {
    return {
      duration: 3000,
      reelStaggerDelay: 400,
      generationDelay: 2500,
      spinCycles: 3, 
      vibrationCycles: 15,
    };
  }

  static get reel() {
    const multiplier = this.getDeviceMultiplier();
    return {
      visibleItems: 3,
      itemHeight: Math.round(70 * multiplier),
      repetitions: 3,
      width: Math.round(80 * multiplier),
    };
  }

  static get machine() {
    const multiplier = this.getDeviceMultiplier();
    return {
      minWidth: Math.round(300 * multiplier),
      borderRadius: 24,
      borderWidth: DeviceDetection.isSmallDevice() ? 2 : 4,
      maxWidth: DeviceDetection.isSmallDevice() ? 350 : 400,
    };
  }

  static get button() {
    const multiplier = this.getDeviceMultiplier();
    return {
      minWidth: Math.round(220 * multiplier),
      fontSize: ResponsiveSpacing.getSpacing(16),
      paddingHorizontal: ResponsiveSpacing.getSpacing(32),
      paddingVertical: ResponsiveSpacing.getSpacing(16),
    };
  }
}
export const SLOT_MACHINE_CONFIG = {
  get animation() { return SlotMachineConfiguration.animation; },
  get reel() { return SlotMachineConfiguration.reel; },
  get machine() { return SlotMachineConfiguration.machine; },
  get button() { return SlotMachineConfiguration.button; },
} as const;

export const SLOT_MACHINE_TEXTS = {
  machineTitle: '🎰 LEAD GENERATOR 🎰',
  coinSlot: '💰',
  decorativeLights: ['✨', '⭐', '✨'],
  statusMessage: '🎲 Finding your perfect lead...',
  buttons: {
    noCredits: 'No Credits',
    generating: 'Generating...',
    generate: 'Generate Lead',
  },
} as const;

export const SLOT_MACHINE_EMOJIS = {
  lifeEvents: ['👶', '⚰️', '💒', '🏠', '💔'],
  priceRanges: ['💵', '💰', '💎'],
  clientTypes: ['🛒', '📋'],
} as const;

export const LEAD_TO_EMOJI_MAP = {
  lifeEvents: {
    'baby': 0,
    'death': 1,
    'married': 2,
    'house-sold': 3,
    'divorced': 4,
  },
  priceRanges: {
    '$': 0,
    '$$': 1,
    '$$$': 2,
  },
  clientTypes: {
    'buyer': 0,
    'seller': 1,
  },
} as const;
