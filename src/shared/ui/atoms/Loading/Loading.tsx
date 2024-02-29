import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
export const Loading = ({ color = "#000", size = 50 }) => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
};
const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.9,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
});
