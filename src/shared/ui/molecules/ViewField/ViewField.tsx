/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import { View } from "react-native";
import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { RFValue } from "react-native-responsive-fontsize";
import { useMemo } from "react";
import { TextAtom } from "../..";

export const ViewField = ({ children }) => {
  return <View style={styles.viewField}>{children}</View>;
};
export const Label = ({ children }) => {
  return <TextAtom style={styles.label}>{children}</TextAtom>;
};
export const Description = ({ children }) => {
  return <TextAtom style={styles.description}>{children}</TextAtom>;
};
export const PriceText = ({ children }) => {
  const priceText = useMemo(() => {
    return `${
      children?.toLocaleString?.("pt-BR", {
        style: "currency",
        currency: "BRL",
      }) ?? ""
    }`;
  }, [children]);
  return <TextAtom style={styles.priceText}>{priceText}</TextAtom>;
};

ViewField.Label = Label;
ViewField.Description = Description;
ViewField.PriceText = PriceText;

const styles = DynamicStyleSheet.create((theme) => ({
  viewField: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 5,
  },
  label: {
    color: theme.colors.text,
    fontSize: RFValue(15),
    fontFamily: fonts.primary_500,
    textAlign: "center",
    marginTop: 3,
  },
  description: {
    color: theme.colors.text,
    fontSize: RFValue(15),
    fontFamily: fonts.primary_400,
    textAlign: "center",
    marginTop: 3,
  },
  priceText: {
    color: theme.colors.tertiary[500],
    fontSize: RFValue(15),
    fontFamily: fonts.primary_600,
    textAlign: "center",
    marginTop: 3,
  },
}));
