import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HeaderSignIn } from "./components";
import { useNavigation } from "@react-navigation/native";
import { SignInForm } from "@/features/auth/by-email";
import { DynamicStyleSheet } from "@/shared/libs/utils";

export const SignIn = ({ title, subtitle }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <HeaderSignIn headerText={title} subtitle={subtitle} />
      <SignInForm navigation={navigation} />
      <StatusBar style={"auto"} />
    </View>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    paddingVertical: 0,
    paddingHorizontal: 24,
    height: "100%",
  },
}));
