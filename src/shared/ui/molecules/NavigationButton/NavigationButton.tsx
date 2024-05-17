import React from "react";
import { TouchableOpacity, Image, View } from "react-native";
import { TextAtom } from "../../atoms";
import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { RFValue } from "react-native-responsive-fontsize";

export const NavigationButton = ({ label, icon, onPress, style = {}, ...rest }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, style]} {...rest}>
    <View style={styles.content}>
      <Image source={icon} style={styles.icon} />
      <TextAtom style={styles.label} numberOfLines={2} ellipsizeMode="tail">
        {label}
      </TextAtom>
    </View>
  </TouchableOpacity>
);

const styles = DynamicStyleSheet.create((theme) => ({
  button: {
    padding: 5,
    borderRadius: 10,
    maxWidth: 100,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 90,
    height: 90,
    marginBottom: 5,
  },
  label: {
    color: theme.colors.text,
    fontSize: RFValue(9), // Adjusted font size for better readability
    fontFamily: fonts.primary_400,
    textAlign: "left",
  },
}));

export default NavigationButton;
