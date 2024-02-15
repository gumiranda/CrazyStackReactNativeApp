import React from "react";
import { MaterialIcon } from "@/shared/ui";
import { View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { DateInfo } from "./DateInfo";
import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
export const RentalPeriod = ({ initDate = "", endDate = "" }) => {
  const theme = useTheme();
  return (
    <View style={styles.rentalPeriod}>
      <View style={styles.calendarIcon}>
        <MaterialIcon
          type="Feather"
          name={"calendar"}
          color={theme.colors.grey[200]}
          size={RFValue(22)}
        />
      </View>
      <DateInfo label="DE" date={initDate} />
      <MaterialIcon
        type="Feather"
        name={"chevron-right"}
        color={theme.colors.text}
        size={RFValue(18)}
      />
      <DateInfo label="ATÉ" date={endDate} />
    </View>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  rentalPeriod: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.grey[800],
    paddingBottom: 16,
  },
  calendarIcon: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.primary[500],
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
}));
