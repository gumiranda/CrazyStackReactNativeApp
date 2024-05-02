import React from "react";
import appMetrics from "@/shared/libs/functions/metrics";
import { FullImageBackground } from "@/shared/ui";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import { View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import Splash from "@/assets/splash.jpg";
import { useNavigation } from "@react-navigation/native";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";

export const Initial = () => {
  const navigation = useNavigation();
  function handleNewAccount() {
    navigation.navigate("SignUpPage", {
      name: "Nome do estabelecimento",
      role: "owner",
    });
  }
  const theme = useTheme();
  return (
    <FullImageBackground style={styles.container} source={Splash}>
      <Text style={styles.bigLogo}>belezix</Text>
      <View style={styles.box}>
        <Text style={styles.title}>Bem-vindo(a) ao Belezix</Text>
        <Text style={styles.subtitle}>
          {"Agende horários em salões de beleza. \nComece já a explorar!"}
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.button}>
        <Text style={styles.textButton}>ENTRAR</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleNewAccount()}
        style={[
          styles.button,
          { backgroundColor: theme.colors.primary[600], marginBottom: 30 },
        ]}
      >
        <Text style={styles.textButton}>CADASTRAR MEU NEGOCIO</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </FullImageBackground>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    padding: appMetrics.PADDING,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bigLogo: {
    fontSize: RFValue(58),
    color: theme.colors.white,
    fontFamily: fonts.primary_700,
    top: getStatusBarHeight() + 36,
    position: "absolute",
  },
  box: {
    marginBottom: appMetrics.PADDING,
  },
  title: {
    fontSize: RFValue(appMetrics.FONT_SIZE_TITLE),
    fontFamily: fonts.primary_700,
    color: theme.colors.white,
    textShadowColor: theme.colors.grey[800],
    textShadowOffset: { width: 2.5, height: 2.5 },
    textShadowRadius: 5,
    textAlign: "center",
  },
  textButton: {
    fontSize: RFValue(12),
    fontFamily: fonts.primary_700,
    color: theme.colors.white,
    textShadowColor: theme.colors.grey[800],
    textShadowOffset: { width: 1.25, height: 1.25 },
    textShadowRadius: 2.5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: RFValue(appMetrics.FONT_SIZE),
    fontFamily: fonts.primary_400,
    marginVertical: 12,
    textAlign: "center",
    color: theme.colors.white,
  },
  button: {
    backgroundColor: theme.colors.tertiary[500],
    borderRadius: 4,
    width: appMetrics.SCREEN_WIDTH * 0.9,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: 40,
    marginTop: 15,
  },
}));
