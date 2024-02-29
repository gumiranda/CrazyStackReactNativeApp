import { DynamicStyleSheet } from "@/shared/libs/utils";
import React from "react";
import { View } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const Footer = ({ children, style = {}, ...rest }) => {
  return (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    width: "100%",
    backgroundColor: theme.colors.background,
    paddingTop: 24,
    paddingBottom: getBottomSpace() + 32,
    paddingHorizontal: 24,
  },
}));
