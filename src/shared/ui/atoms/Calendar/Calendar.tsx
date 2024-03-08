import React from "react";
import { Calendar as CustomCalendar, LocaleConfig } from "react-native-calendars";
import { ptBR } from "./localeConfig";
import { MaterialIcon } from "../MaterialIcon";
import { fonts, useTheme } from "@/shared/libs/utils";

export const Calendar = ({ markedDates, onDayPress }: CalendarProps) => {
  const theme = useTheme();
  return (
    <CustomCalendar
      renderArrow={(direction) => (
        <MaterialIcon
          type="Feather"
          name={direction === "left" ? "chevron-left" : "chevron-right"}
          size={24}
          color={theme.colors.text}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text,
        paddingBottom: 0,
        marginBottom: 1,
      }}
      theme={{
        backgroundColor: theme.colors.background,
        calendarBackground: theme.colors.background,
        textSectionTitleColor: theme.colors.primary[500],
        textSectionTitleDisabledColor: theme.colors.tertiary[500],
        selectedDayBackgroundColor: theme.colors.primary[500],
        selectedDayTextColor: theme.colors.background,
        todayBackgroundColor: theme.colors.primary[300],
        todayButtonTextColor: theme.colors.background,
        todayTextColor: theme.colors.background,
        textDayFontFamily: fonts.primary_400,
        dayTextColor: theme.colors.primary[500],
        textDisabledColor: theme.colors.grey[500],
        textDayHeaderFontFamily: fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: fonts.secondary_600,
        textMonthFontSize: 20,
        arrowStyle: {
          marginHorizontal: -15,
        },
        arrowColor: theme.colors.primary[500],
        disabledArrowColor: theme.colors.tertiary[500],
        monthTextColor: theme.colors.primary[500],
        indicatorColor: theme.colors.primary[500],
        textDayFontWeight: "400",
        textDayHeaderFontWeight: "400",
        textDayFontSize: 12,
      }}
      firstDay={1}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
      minDate={new Date().toISOString()}
    />
  );
};
LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";
export interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
}

export interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

export interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: any;
}
