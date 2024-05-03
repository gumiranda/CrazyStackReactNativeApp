import { TextInput as RNTextInput } from "react-native";
import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { forwardRef } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { MaskedTextInput } from "react-native-mask-text";

export const TextInputAux = ({ style = {}, ...rest }: any, ref) => {
  if (rest?.mask) {
    return (
      <MaskedTextInput
        {...rest}
        ref={ref}
        style={[styles.baseStyle, style]}
        data-testid="InputTestId"
      />
    );
  }
  return (
    <RNTextInput
      {...rest}
      ref={ref}
      style={[styles.baseStyle, style]}
      data-testid="InputTestId"
    />
  );
};
const styles = DynamicStyleSheet.create(() => ({
  baseStyle: {
    fontSize: RFValue(14),
    paddingLeft: RFValue(28),
    paddingRight: RFValue(12),
    height: 56,
    borderRadius: RFValue(2),
    width: "100%",
    fontFamily: fonts.primary_400,
  },
}));
export const TextInput = forwardRef(TextInputAux);
