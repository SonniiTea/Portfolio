import { useAuth } from "@/utils/auth/useAuth";
import { withLayoutContext, useGlobalSearchParams } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useFonts,
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_400Regular_Italic,
} from "@expo-google-fonts/playfair-display";
import {
  CrimsonText_400Regular,
  CrimsonText_700Bold,
} from "@expo-google-fonts/crimson-text";
import Transition from "react-native-screen-transitions";
import { createBlankStackNavigator } from "react-native-screen-transitions/blank-stack";
import { interpolate } from "react-native-reanimated";

const { Navigator } = createBlankStackNavigator();
const TransitionStack = withLayoutContext(Navigator);

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function useSharedTag() {
  const { tag } = useGlobalSearchParams();
  return typeof tag === "string" ? tag : "hero";
}

export default function RootLayout() {
  const { initiate, isReady: authReady } = useAuth();

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_400Regular_Italic,
    CrimsonText_400Regular,
    CrimsonText_700Bold,
  });

  useEffect(() => {
    initiate();
  }, [initiate]);

  useEffect(() => {
    if (authReady && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [authReady, fontsLoaded]);

  const sharedBoundTag = useSharedTag();

  if (!authReady || !fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TransitionStack screenOptions={{ headerShown: false }}>
          <TransitionStack.Screen
            name="(tabs)"
            options={{ ...Transition.Presets.SharedXImage({ sharedBoundTag }) }}
          />
          <TransitionStack.Screen
            name="drink/[id]"
            options={{
              gestureEnabled: true,
              gestureDirection: "vertical",
              ...Transition.Presets.SharedXImage({ sharedBoundTag }),
              screenStyleInterpolator: ({
                focused,
                bounds,
                current,
                layouts: { screen },
                progress,
              }) => {
                "worklet";
                if (!focused) return {};
                const boundValues = bounds({
                  id: sharedBoundTag,
                  method: "transform",
                  raw: true,
                });
                const dragY = interpolate(
                  current.gesture.normalizedY,
                  [-1, 0, 1],
                  [-screen.height, 0, screen.height],
                );
                const contentY = interpolate(
                  progress,
                  [0, 1],
                  [dragY >= 0 ? screen.height : -screen.height, 0],
                );
                return {
                  [sharedBoundTag]: {
                    transform: [
                      { translateX: boundValues.translateX },
                      { translateY: boundValues.translateY },
                      { scaleX: boundValues.scaleX },
                      { scaleY: boundValues.scaleY },
                    ],
                  },
                  contentStyle: {
                    transform: [
                      { translateY: contentY },
                      { translateY: dragY },
                    ],
                    pointerEvents: current.animating ? "none" : "auto",
                  },
                };
              },
            }}
          />
        </TransitionStack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
