import "./config/reactotronConfig";
import React, { useCallback, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Test } from "@/screens/Test";
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
import { UiProvider, useUi } from "./providers";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";

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
        <Page />
      </UiProvider>
    </GestureHandlerRootView>
  );
}
const Page = () => {
  const { setLoading, setDialog, setIsOpen } = useUi();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDialog({
        mainButton: "Ok",
        colorScheme: "default",
        title: "Title",
        dismissButton: "Cancel",
        body: "Body",
        onPress: () => console.log("pressed"),
      });
      setIsOpen(true);
    }, 3000);
  }, []);
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Test style={{ alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            alignSelf: "center",
            fontFamily: fonts.primary_700,
            fontSize: 58,
            color: theme.colors.white,
          }}
        >
          belezix
        </Text>
      </Test>
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
}));
