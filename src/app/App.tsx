import "./config/reactotronConfig";
import React, { useCallback, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
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
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { RFValue } from "react-native-responsive-fontsize";

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
      <Text style={styles.bigLogo}>belezix</Text>
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
          <Text style={styles.textButton}>ENTRAR</Text>
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
          <Text style={styles.textButton}>CADASTRAR MEU NEGÓCIO</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </Test>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  textButton: {
    textAlign: "center",
    fontFamily: fonts.primary_700,
    fontSize: RFValue(12),
    color: theme.colors.white,
    textShadowColor: theme.colors.grey[800],
    textShadowOffset: { width: 1.25, height: 1.25 },
    textShadowRadius: 2.5,
  },
  bigLogo: {
    fontFamily: fonts.primary_700,
    fontSize: RFValue(58),
    color: theme.colors.white,
    position: "absolute",
    top: getStatusBarHeight() + 36,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: appMetrics.PADDING,
  },
  subtitle: {
    color: theme.colors.white,
    textAlign: "center",
    fontSize: appMetrics.FONT_SIZE,
    fontFamily: fonts.primary_400,
    marginVertical: 12,
  },
  title: {
    fontFamily: fonts.primary_700,
    color: theme.colors.white,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: RFValue(appMetrics.FONT_SIZE_TITLE),
    textShadowColor: theme.colors.grey[800],
    textShadowOffset: { width: 2.5, height: 2.5 },
    textShadowRadius: 5,
  },
  button: {
    marginTop: 15,
    width: appMetrics.SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    backgroundColor: theme.colors.tertiary[500],
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  button2: {
    marginTop: 15,
    width: appMetrics.SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    backgroundColor: theme.colors.primary[600],
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  box: {
    marginBottom: appMetrics.PADDING * 1,
  },
}));
