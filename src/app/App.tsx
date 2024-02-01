import "./config/reactotronConfig";
import React, { useCallback, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
  const { setLoading, setDialog, setIsOpen, isOpen } = useUi();
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "Spartan_700Bold", fontSize: 58, color: "#7159c1" }}>
        belezix
      </Text>
      <TouchableOpacity
        onPress={() => {
          setLoading((prev) => !prev);
          setTimeout(() => {
            setLoading((prev) => !prev);
          }, 3000);
        }}
      >
        <Text style={{ fontFamily: "Spartan_700Bold", fontSize: 12, color: "#7159c1" }}>
          TESTANDO LOADING
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          setDialog({
            mainButton: "ok",
            colorScheme: "default",
            isOpen,
            setIsOpen,
            title: "Testando",
            dismissButton: "Cancelar",
            onPress: () => {
              console.tron.log("Testando dialog");
            },
            body: "Testando dialog",
          });
          setIsOpen(true);
        }}
      >
        <Text style={{ fontFamily: "Spartan_700Bold", fontSize: 12, color: "#7159c1" }}>
          TESTANDO DIALOG
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      {/* <Test /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
