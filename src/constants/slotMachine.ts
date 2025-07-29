export const SLOT_MACHINE_CONFIG = {
  animation: {
    duration: 3500,
    reelStaggerDelay: 300,
    generationDelay: 2800,
    spinCycles: 6,
    vibrationCycles: 12,
    minSpins: 4,
    maxSpins: 8,
  },
  reel: {
    visibleItems: 3,
    itemHeight: 70,
    repetitions: 8,
    width: 80,
  },
  machine: {
    minWidth: 300,
    borderRadius: 24,
    borderWidth: 4,
    glowEffect: true,
  },
  button: {
    minWidth: 220,
    fontSize: 16,
    pulseIntensity: 1.05,
  },
  userControl: {
    enableManualStop: false,
    showSkipOption: true,
    skipAvailableAfter: 2000,
  },
} as const;

export const SLOT_MACHINE_TEXTS = {
  machineTitle: '🎰 LEAD GENERATOR 🎰',
  coinSlot: '💰',
  decorativeLights: ['✨', '⭐', '✨'],
  statusMessage: '🎲 Finding your perfect lead...',
  statusMessages: {
    searching: '🎲 Finding your perfect lead...',
    analyzing: '🔍 Analyzing market data...',
    finalizing: '✨ Finalizing your match...',
  },
  buttons: {
    noCredits: 'No Credits',
    generating: 'Generating...',
    generate: 'Generate Lead',
    viewResults: 'View Lead', 
    viewDetails: 'View Lead',
    skip: 'Skip Animation',
  },
} as const;

export const SLOT_MACHINE_EMOJIS = {
  lifeEvents: ['👶', '⚰️', '💒', '🏠', '💔'] as const,
  priceRanges: ['💵', '💰', '💎'] as const,
  clientTypes: ['🛒', '📋'] as const,
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