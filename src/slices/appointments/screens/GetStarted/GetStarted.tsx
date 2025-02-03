import React from "react";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import { Welcome } from "./components/Welcome";

export const GetStarted = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  function handleSignIn() {
    navigation.navigate("SignInPage");
  }
  return (
    <View style={styles.container}>
      <Welcome />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  container: { flex: 1, padding: 40, gap: 40, backgroundColor: theme.colors.background },
}));
