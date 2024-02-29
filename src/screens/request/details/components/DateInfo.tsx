import React from "react";
import { TextAtom } from "@/shared/ui";
import { View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
export const DateInfo = ({ date = "", label = "DE" }) => {
  return (
    <View style={styles.dateInfo}>
      <TextAtom style={styles.dateTitle}>{label}</TextAtom>
      <TextAtom style={styles.dateValue}>{date}</TextAtom>
    </View>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  dateInfo: {},
  dateTitle: {
    fontFamily: fonts.primary_500,
    color: theme.colors.text,
    fontSize: RFValue(10),
    textTransform: "uppercase",
  },
  dateValue: {
    fontFamily: fonts.secondary_500,
    color: theme.colors.text,
    fontSize: RFValue(15),
  },
}));
