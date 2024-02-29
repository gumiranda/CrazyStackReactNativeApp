import React from "react";
import { Text as RNText } from "react-native";

interface TextProps {
  style?: any; // You can define more specific types for style if needed
  children: React.ReactNode;
  [key: string]: any;
}

export const TextAtom: React.FC<TextProps> = ({ style, children, ...rest }) => {
  return (
    <RNText {...rest} style={style}>
      {children}
    </RNText>
  );
};
