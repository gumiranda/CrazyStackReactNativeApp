import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { DynamicStyleSheet } from "@/shared/libs/utils";
import { Welcome } from "./components/Welcome";
import { Steps } from "./components/Steps";
import { Button } from "@/shared/ui";

export const GetStarted = () => {
  const navigation = useNavigation();

  function handleNextGetStarted() {
    //navigation.navigate("SignInPage");
    navigation.navigate("HomeClient");
  }
  return (
    <View style={styles.container}>
      <Welcome />
      <Steps />
      <Button onPress={() => handleNextGetStarted()}>
        <Button.Title>Começar</Button.Title>
      </Button>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  container: { flex: 1, padding: 40, gap: 40, backgroundColor: theme.colors.background },
}));
