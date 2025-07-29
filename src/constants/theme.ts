import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const DeviceDetection = {
  isSmallDevice: () => SCREEN_WIDTH < 375,
  isMediumDevice: () => SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414,
  isLargeDevice: () => SCREEN_WIDTH >= 414,
  
  getDeviceType: () => {
    if (DeviceDetection.isSmallDevice()) return 'small';
    if (DeviceDetection.isMediumDevice()) return 'medium';
    return 'large';
  }
} as const;

export const ResponsiveSpacing = {
  getSpacing: (baseSize: number) => {
    const deviceType = DeviceDetection.getDeviceType();
    const multipliers = { small: 0.8, medium: 0.9, large: 1.0 };
    return Math.round(baseSize * multipliers[deviceType]);
  }
} as const;

export const COLORS = {
  primary: '#2196F3',
  primaryLight: '#E3F2FD',
  primaryDark: '#1976D2',
  
  secondary: '#FF9800',
  secondaryLight: '#FFF3E0',
  secondaryDark: '#F57C00',
  
  success: '#4CAF50',
  successLight: '#E8F5E8',
  warning: '#FF9800',
  warningLight: '#FFF3E0',
  error: '#F44336',
  errorLight: '#FFEBEE',
  
  textPrimary: '#212121',
  textSecondary: '#757575',
  textHint: '#BDBDBD',
  
  background: '#FAFAFA',
  backgroundSecondary: '#F5F5F5',
  white: '#FFFFFF',
  
  border: '#E0E0E0',
  borderLight: '#F0F0F0',
  
  surface: '#FFFFFF',
  
  divider: '#E0E0E0',
} as const;

export const TYPOGRAPHY = {
  h1: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    lineHeight: 32,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    lineHeight: 28,
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    lineHeight: 24,
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    lineHeight: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: 'normal' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 20,
  },
  emoji: {
    fontSize: 32,
    lineHeight: 40,
  },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
} as const;

export const ICON_SIZES = {
  small: ResponsiveSpacing.getSpacing(16),
  medium: ResponsiveSpacing.getSpacing(20),
  large: ResponsiveSpacing.getSpacing(24),
  extraLarge: ResponsiveSpacing.getSpacing(28),
} as const;

export const BORDER_RADIUS = {
  small: 4,
  medium: 8,
  large: 12,
  circle: 50,
} as const;