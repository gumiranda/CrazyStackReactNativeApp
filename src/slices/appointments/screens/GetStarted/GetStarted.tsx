import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import { Welcome } from "./components/Welcome";
import { Steps } from "./components/Steps";

export const GetStarted = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  function handleSignIn() {
    navigation.navigate("SignInPage");
  }
  return (
    <View style={styles.container}>
      <Welcome />
      <Steps />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  container: { flex: 1, padding: 40, gap: 40, backgroundColor: theme.colors.background },
}));
