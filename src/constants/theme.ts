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
  accent: '#4CAF50',
  error: '#F44336',
  errorLight: '#FFEBEE',
  warning: '#FF9800',
  warningLight: '#FFF3E0',
  success: '#4CAF50',
  successLight: '#E8F5E8',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  divider: '#E0E0E0',
  textPrimary: '#212121',
  textSecondary: '#757575',
  textHint: '#9E9E9E',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const TYPOGRAPHY = {
  headline: {
    fontSize: ResponsiveSpacing.getSpacing(24),
    fontWeight: 'bold' as const,
    lineHeight: ResponsiveSpacing.getSpacing(32),
  },
  title: {
    fontSize: ResponsiveSpacing.getSpacing(20),
    fontWeight: '600' as const,
    lineHeight: ResponsiveSpacing.getSpacing(28),
  },
  subtitle: {
    fontSize: ResponsiveSpacing.getSpacing(16),
    fontWeight: '500' as const,
    lineHeight: ResponsiveSpacing.getSpacing(24),
  },
  body: {
    fontSize: ResponsiveSpacing.getSpacing(16),
    fontWeight: 'normal' as const,
    lineHeight: ResponsiveSpacing.getSpacing(24),
  },
  bodySmall: {
    fontSize: ResponsiveSpacing.getSpacing(14),
    fontWeight: 'normal' as const,
    lineHeight: ResponsiveSpacing.getSpacing(20),
  },
  caption: {
    fontSize: ResponsiveSpacing.getSpacing(12),
    fontWeight: 'normal' as const,
    lineHeight: ResponsiveSpacing.getSpacing(16),
  },
  button: {
    fontSize: ResponsiveSpacing.getSpacing(16),
    fontWeight: '600' as const,
    lineHeight: ResponsiveSpacing.getSpacing(20),
  },
} as const;

export const SPACING = {
  xs: ResponsiveSpacing.getSpacing(4),
  sm: ResponsiveSpacing.getSpacing(8),
  md: ResponsiveSpacing.getSpacing(16),
  lg: ResponsiveSpacing.getSpacing(24),
  xl: ResponsiveSpacing.getSpacing(32),
  xxl: ResponsiveSpacing.getSpacing(40),
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

export const SHADOWS = {
  small: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;
