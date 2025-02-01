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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.9,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
});
