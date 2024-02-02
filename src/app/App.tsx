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
import appMetrics from "@/shared/libs/functions/metrics";
import { darken, lighten } from "polished";
const colors = {
  primary: {
    500: "#9f7aea",
    600: "#5f38e0",
  },
  secondary: {
    400: lighten(0.1, "#2e2e2e"),
    500: "#2e2e2e",
    600: "#212121",
  },
  tertiary: {
    500: "#04D361",
    600: darken(0.1, "#04D361"),
  },
};
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
    <Test style={styles.container}>
      <Text
        style={{
          fontFamily: "Spartan_700Bold",
          fontSize: 58,
          color: "#fff",
          position: "absolute",
          top: appMetrics.NAV_HEIGHT,
        }}
      >
        belezix
      </Text>
      <View style={styles.box}>
        <Text style={styles.title}>Bem-vindo(a) ao Belezix</Text>
        <Text style={styles.subtitle}>
          {"Agende horários em salões de beleza. \nComece já a explorar!"}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setLoading((prev) => !prev);
            setTimeout(() => {
              setLoading((prev) => !prev);
            }, 3000);
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Spartan_700Bold",
              fontSize: 12,
              color: "#fff",
            }}
          >
            ENTRAR
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
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
          <Text
            style={{
              fontFamily: "Spartan_700Bold",
              fontSize: 12,
              color: "#fff",
            }}
          >
            CADASTRAR MEU NEGÓCIO
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </Test>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: appMetrics.PADDING,
  },
  subtitle: {
    color: "white",
    textAlign: "center",
    fontSize: appMetrics.FONT_SIZE,
    fontFamily: "Spartan_400Regular",
    marginVertical: 12,
  },
  title: {
    fontFamily: "Spartan_700Bold",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: appMetrics.FONT_SIZE_TITLE,
  },
  button: {
    marginTop: 15,
    width: appMetrics.SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    backgroundColor: colors.tertiary[600],
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  button2: {
    marginTop: 15,
    width: appMetrics.SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    backgroundColor: colors.primary[600],
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  box: {
    marginBottom: appMetrics.PADDING * 1,
  },
});
