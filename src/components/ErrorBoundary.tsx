import React, { Component, ReactNode } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SIMPLE_COLORS = {
  primary: '#2196F3',
  error: '#F44336',
  errorLight: '#FFEBEE',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  textPrimary: '#212121',
  textSecondary: '#757575',
};

const SIMPLE_SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

interface Props {
  children: ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

interface ErrorFallbackProps {
  error: Error;
  onReset: () => void;
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ error, onReset }) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <Ionicons name="alert-circle" size={64} color={SIMPLE_COLORS.error} />
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>
        We're sorry, but something unexpected happened. Please try again.
      </Text>
      {__DEV__ && (
        <View style={styles.errorDetails}>
          <Text style={styles.errorTitle}>Error Details (Development Only):</Text>
          <Text style={styles.errorText}>{error.message}</Text>
          <Text style={styles.errorStack}>{error.stack}</Text>
        </View>
      )}
      <Pressable style={styles.retryButton} onPress={onReset}>
        <Text style={styles.retryButtonText}>Try Again</Text>
      </Pressable>
    </View>
  </View>
);

export class ErrorBoundary extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (!__DEV__) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  public override render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent 
          error={this.state.error} 
          onReset={this.handleReset} 
        />
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SIMPLE_COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIMPLE_SPACING.lg,
  },
  content: {
    alignItems: 'center',
    backgroundColor: SIMPLE_COLORS.surface,
    borderRadius: 12,
    padding: SIMPLE_SPACING.xl,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    maxWidth: 400,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: SIMPLE_COLORS.textPrimary,
    marginTop: SIMPLE_SPACING.md,
    marginBottom: SIMPLE_SPACING.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: SIMPLE_COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIMPLE_SPACING.lg,
    lineHeight: 20,
  },
  errorDetails: {
    backgroundColor: SIMPLE_COLORS.errorLight,
    borderRadius: 8,
    padding: SIMPLE_SPACING.md,
    marginBottom: SIMPLE_SPACING.lg,
    width: '100%',
  },
  errorTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: SIMPLE_COLORS.error,
    marginBottom: SIMPLE_SPACING.sm,
  },
  errorText: {
    fontSize: 12,
    color: SIMPLE_COLORS.error,
    marginBottom: SIMPLE_SPACING.xs,
  },
  errorStack: {
    fontSize: 10,
    color: SIMPLE_COLORS.textSecondary,
  },
  retryButton: {
    backgroundColor: SIMPLE_COLORS.primary,
    paddingHorizontal: SIMPLE_SPACING.lg,
    paddingVertical: SIMPLE_SPACING.md,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: SIMPLE_COLORS.surface,
  },
});