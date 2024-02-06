import React from "react";
import { TextAtom } from "@/shared/ui/atoms";
import { View } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";

export const HeaderSignIn = ({ headerText, subtitle, children = null }) => {
  return (
    <View style={styles.header}>
      <TextAtom style={styles.title}>{headerText}</TextAtom>
      <TextAtom style={styles.subtitle}>{subtitle}</TextAtom>
      {children}
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  header: {
    width: "100%",
    marginTop: getStatusBarHeight() + 115,
  },
  title: {
    color: theme.colors.text,
    fontFamily: fonts.secondary_600,
    fontSize: RFValue(40),
  },
  subtitle: {
    color: theme.colors.text,
    fontFamily: fonts.primary_400,
    fontSize: RFValue(15),
    marginTop: 16,
    lineHeight: 30,
  },
}));
