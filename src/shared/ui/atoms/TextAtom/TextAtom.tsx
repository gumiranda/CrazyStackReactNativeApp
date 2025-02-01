import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import React from "react";
import { Text as RNText } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface TextProps {
  style?: any; // You can define more specific types for style if needed
  children: React.ReactNode;
  [key: string]: any;
}

export const TextAtom: React.FC<TextProps> = ({ style, children, ...rest }) => {
  return (
    <RNText {...rest} style={[styles.baseText, style]}>
      {children}
    </RNText>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  baseText: {
    fontFamily: fonts.primary_400,
    fontSize: RFValue(16),
    color: theme.colors.text,
  },
}));
