import React from "react";
import { BackButton, TextAtom } from "@/shared/ui/atoms";
import { View } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { useNavigation } from "@react-navigation/native";

export const HeaderSignIn = ({ headerText, subtitle, children = null }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <BackButton
        onPress={() => {
          navigation.goBack();
        }}
      />
      <TextAtom style={styles.title}>{headerText}</TextAtom>
      <TextAtom style={styles.subtitle}>{subtitle}</TextAtom>
      {children}
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  header: {
    width: "100%",
    marginTop: getStatusBarHeight() + 105,
  },
  title: {
    color: theme.colors.text,
    fontFamily: fonts.secondary_600,
    fontSize: RFValue(40),
    marginTop: 16,
  },
  subtitle: {
    color: theme.colors.text,
    fontFamily: fonts.primary_400,
    fontSize: RFValue(15),
    marginTop: 16,
    lineHeight: 30,
  },
}));
