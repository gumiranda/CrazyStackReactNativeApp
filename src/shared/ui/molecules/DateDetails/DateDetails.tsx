/* eslint-disable react/display-name */
import { View } from "react-native";
import { DynamicStyleSheet, fonts, formatDate } from "@/shared/libs/utils";
import { TextAtom } from "@/shared/ui";
import { RFValue } from "react-native-responsive-fontsize";
import { useMemo } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const DateDetails = ({ initDate, endDate }) => {
  const dateFormatted = useMemo(() => formatDate(new Date(initDate)), [initDate]);
  const hour = useMemo(() => {
    const formattedInitDate = initDate
      ? format(new Date(initDate), "HH:mm", { locale: ptBR })
      : "";
    const formattedEndDate = endDate
      ? format(new Date(endDate), "HH:mm", { locale: ptBR })
      : "";
    return `${formattedInitDate} - ${formattedEndDate}`;
  }, [initDate, endDate]);
  return (
    <View style={styles.dateDetails}>
      <TextAtom style={styles.date}>{dateFormatted}</TextAtom>
      <TextAtom style={styles.hour}>{hour}</TextAtom>
    </View>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  dateDetails: {},
  date: {
    color: theme.colors.text,
    fontSize: RFValue(15),
    fontFamily: fonts.primary_400,
    textAlign: "center",
    marginTop: 3,
    textTransform: "capitalize",
  },
  hour: {
    color: theme.colors.text,
    fontSize: RFValue(15),
    fontFamily: fonts.primary_600,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 25,
  },
}));
