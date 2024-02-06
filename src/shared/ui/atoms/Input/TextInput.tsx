import { DynamicStyleSheet } from "@/shared/libs/utils";
import React, { forwardRef } from "react";
import { TextInput as RNTextInput } from "react-native";

const TextInputAux = ({ style = null, ...rest }, ref) => {
  return <RNTextInput ref={ref} {...rest} style={style ?? styles.input} />;
};
const styles = DynamicStyleSheet.create(() => ({
  input: {
    fontSize: 16,
    fontWeight: "500",
    paddingLeft: 48,
    paddingRight: 12,
    height: 48,
    borderRadius: 12,
    width: "100%",
  },
}));

export const TextInput = forwardRef(TextInputAux);
