import appMetrics from "@/shared/libs/functions/metrics";
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
const image = {
  uri: "https://i.ibb.co/gtHZ4Hd/Captura-de-Tela-2024-02-15-a-s-09-25-00.png",
};
type Props = {
  children: React.ReactNode;
  style: any;
};
export const RetangleBorded = ({ children, style }: Props) => {
  return (
    <ImageBackground style={{ ...styles.image, ...style }} source={image}>
      {children}
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  image: {
    justifyContent: "center",
    alignItems: "center",

    width: appMetrics.SCREEN_WIDTH * 1,
  },
});
