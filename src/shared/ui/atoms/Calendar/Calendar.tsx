import { useTheme } from "@/shared/libs/utils";
import { Calendar as CustomCalendar, LocaleConfig } from "react-native-calendars";
import { MaterialIcon } from "../MaterialIcon";
import { ptBR } from "./localeConfig";
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
  onDayPress: (day: DayProps) => void;
}
