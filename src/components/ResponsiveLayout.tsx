import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { SPACING } from '../constants/theme';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  showStatusBar?: boolean;
  scrollable?: boolean;
  contentPadding?: boolean;
  edges?: Edge[];
}

const { height: screenHeight } = Dimensions.get('window');
const MIN_CONTENT_HEIGHT = screenHeight * 0.7;

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  showStatusBar = true,
  scrollable = false,
  contentPadding = true,
  edges = ['top', 'left', 'right'],
}) => {
  const containerStyle = [
    styles.container,
    !showStatusBar && styles.noStatusBar,
  ];

  const contentStyle = [
    contentPadding && styles.contentPadding,
    scrollable && styles.scrollableContent,
  ];

  const safeAreaEdges: Edge[] = showStatusBar ? edges : ['left', 'right'];

  if (scrollable) {
    return (
      <SafeAreaView style={containerStyle} edges={safeAreaEdges}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[contentStyle, { minHeight: MIN_CONTENT_HEIGHT }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={containerStyle} edges={safeAreaEdges}>
      <View style={[contentStyle, { minHeight: MIN_CONTENT_HEIGHT }]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  noStatusBar: {
    paddingTop: 0,
  },
  contentPadding: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  scrollableContent: {
    flexGrow: 1,
  },
  scrollView: {
    flex: 1,
  },
});