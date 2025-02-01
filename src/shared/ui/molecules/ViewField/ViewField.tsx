import { View } from "react-native";
import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { TextAtom } from "../../atoms";
import { RFValue } from "react-native-responsive-fontsize";
import { useMemo } from "react";

export const ViewField = ({ children, style = {}, ...rest }) => {
  return (
    <View {...rest} style={[styles.baseStyle, style]} data-testid="ViewFieldTestId">
      {children}
    </View>
  );
};
export const Label = ({ children, style = {}, ...rest }) => {
  return (
    <TextAtom {...rest} style={[styles.label, style]} data-testid="LabelTestId">
      {children}
    </TextAtom>
  );
};
export const PriceText = ({ children, style = {}, ...rest }) => {
  const priceText = useMemo(() => {
    return `${
      children?.toLocaleString?.("pt-BR", {
        style: "currency",
        currency: "BRL",
      }) ?? ""
    }`;
  }, [children]);
  return (
    <TextAtom {...rest} style={[styles.priceText, style]} data-testid="PriceTextTestId">
      {priceText}
    </TextAtom>
  );
};
export const Description = ({ children, style = {}, ...rest }) => {
  return (
    <TextAtom
      {...rest}
      style={[styles.description, style]}
      data-testid="DescriptionTestId"
    >
      {children}
    </TextAtom>
  );
};

ViewField.Label = Label;
ViewField.Description = Description;
ViewField.PriceText = PriceText;

const styles = DynamicStyleSheet.create((theme) => ({
  baseStyle: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 5,
  },
  label: {
    color: theme.colors.text,
    fontSize: RFValue(16),
    fontFamily: fonts.primary_500,
    textAlign: "center",
    marginTop: 3,
  },
  description: {
    color: theme.colors.text,
    fontSize: RFValue(14),
    fontFamily: fonts.primary_400,
    textAlign: "center",
    marginTop: 3,
  },
  priceText: {
    color: theme.dark ? theme.colors.tertiary[300] : theme.colors.tertiary[500],
    fontSize: RFValue(14),
    fontFamily: fonts.primary_600,
    textAlign: "center",
    marginTop: 3,
  },
}));
