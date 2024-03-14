import { DynamicStyleSheet } from "@/shared/libs/utils";
import React, { forwardRef } from "react";
import { TextInput as RNTextInput } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

const TextInputAux = ({ style = null, ...rest }: any, ref) => {
  if (rest?.mask) {
    return <MaskedTextInput ref={ref} {...rest} style={style ?? styles.input} />;
  }
  return <RNTextInput ref={ref} {...rest} style={style ?? styles.input} />;
};
const styles = DynamicStyleSheet.create(() => ({
  input: {
    fontSize: 16,
    paddingLeft: 48,
    paddingRight: 12,
    height: 48,
    borderRadius: 12,
    width: "100%",
  },
}));

export const TextInput = forwardRef(TextInputAux);
