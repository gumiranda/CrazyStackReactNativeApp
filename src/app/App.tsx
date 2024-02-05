import "./config/reactotronConfig";
import React, { useCallback, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from "@expo-google-fonts/archivo";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import {
  Spartan_400Regular,
  Spartan_500Medium,
  Spartan_700Bold,
  Spartan_600SemiBold,
  Spartan_800ExtraBold,
} from "@expo-google-fonts/spartan";
import { UiProvider } from "./providers";
import MainNavigator from "@/shared/libs/navigation/MainNavigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Spartan_400Regular,
    Spartan_500Medium,
    Spartan_700Bold,
    Spartan_600SemiBold,
    Spartan_800ExtraBold,
  });
  useEffect(() => {
    async function init() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (error) {
        console.warn(error);
      }
    }
    init();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <UiProvider>
        <MainNavigator />
      </UiProvider>
    </GestureHandlerRootView>
  );
}
