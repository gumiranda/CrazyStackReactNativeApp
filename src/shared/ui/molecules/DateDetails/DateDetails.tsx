import { View } from "react-native";
import { DynamicStyleSheet, fonts, formatDate } from "@/shared/libs/utils";
import { useMemo } from "react";
import { TextAtom } from "../../atoms";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { RFValue } from "react-native-responsive-fontsize";

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
    <View style={styles.dateDetails} data-testid="DateDetailsTestId">
      <TextAtom style={styles.date}>{dateFormatted}</TextAtom>
      <TextAtom style={styles.hour}>{hour}</TextAtom>
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  dateDetails: {
    marginTop: 15,
  },
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
