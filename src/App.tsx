import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Test } from "@/screens/Test";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>wedddb FALA DEVDOIDO Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Test />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
