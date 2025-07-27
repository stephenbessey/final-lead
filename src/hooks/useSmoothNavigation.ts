import { useCallback, useRef } from 'react';
import { Animated, InteractionManager } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

interface SmoothNavigationOptions {
  delayMs?: number;
  fadeOut?: boolean;
  userInitiated?: boolean;
}

export const useSmoothNavigation = <ParamList extends Record<string, object | undefined>>(
  navigation: StackNavigationProp<ParamList>
) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const isNavigating = useRef(false);

  const navigateWithTransition = useCallback(
    <RouteName extends keyof ParamList>(
      routeName: RouteName,
      params?: ParamList[RouteName],
      options: SmoothNavigationOptions = {}
    ) => {
      const {
        delayMs = 0,
        fadeOut = false,
        userInitiated = false,
      } = options;

      if (isNavigating.current) {
        return;
      }

      isNavigating.current = true;

      const performNavigation = () => {
        InteractionManager.runAfterInteractions(() => {
          try {
            if (params !== undefined) {
              (navigation as any).navigate(routeName, params);
            } else {
              (navigation as any).navigate(routeName);
            }
          } finally {
            isNavigating.current = false;
            
            if (fadeOut) {
              fadeAnim.setValue(1);
            }
          }
        });
      };

      if (fadeOut && !userInitiated) {
        Animated.timing(fadeAnim, {
          toValue: 0.7,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(performNavigation, delayMs);
        });
      } else if (delayMs > 0 && !userInitiated) {
        setTimeout(performNavigation, delayMs);
      } else {
        performNavigation();
      }
    },
    [navigation, fadeAnim]
  );

  const navigateWithDelay = useCallback(
    <RouteName extends keyof ParamList>(
      routeName: RouteName,
      params?: ParamList[RouteName],
      delayMs: number = 1000
    ) => {
      navigateWithTransition(routeName, params, { delayMs, fadeOut: true });
    },
    [navigateWithTransition]
  );

  const navigateImmediately = useCallback(
    <RouteName extends keyof ParamList>(
      routeName: RouteName,
      params?: ParamList[RouteName]
    ) => {
      navigateWithTransition(routeName, params, { userInitiated: true });
    },
    [navigateWithTransition]
  );

  return {
    navigateWithTransition,
    navigateWithDelay,
    navigateImmediately,
    fadeAnim,
    isNavigating: isNavigating.current,
  };
};