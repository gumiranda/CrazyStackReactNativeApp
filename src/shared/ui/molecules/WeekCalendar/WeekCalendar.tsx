import { ScrollView, View } from "react-native";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import { Calendar } from "react-native-big-calendar";
import CalendarStrip from "react-native-calendar-strip";
import { addDays } from "date-fns";
import appMetrics from "@/shared/libs/functions/metrics";

export const WeekCalendar = ({
  selectedDate,
  onDateSelected,
  onPressEvent,
  events = [],
}) => {
  const theme = useTheme();
  const datesBlacklist = [];
  const datesWhitelist = [
    { start: addDays(new Date(), -365) as any, end: addDays(new Date(), 365) as any },
  ];
  return (
    <View data-testid="WeekCalendarTestId">
      <View style={styles.baseStyle}>
        <CalendarStrip
          scrollable
          scrollerPaging
          onDateSelected={onDateSelected}
          selectedDate={selectedDate}
          daySelectionAnimation={
            {
              type: "border",
              borderWidth: 1,
              borderHighlightColor: theme.colors.white,
            } as any
          }
          style={styles.calendarStrip}
          calendarHeaderStyle={styles.calendarHeaderStyle}
          calendarColor={theme.colors.primary[500]}
          dateNumberStyle={styles.dateNumberStyle}
          dateNameStyle={styles.dateNameStyle}
          highlightDateNumberStyle={styles.highlightDateNumberStyle}
          highlightDateNameStyle={styles.highlightDateNameStyle}
          disabledDateNameStyle={styles.disabledDateNameStyle}
          disabledDateNumberStyle={styles.disabledDateNumberStyle}
          datesWhitelist={datesWhitelist}
          datesBlacklist={datesBlacklist}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        <Calendar
          date={selectedDate}
          onChangeDate={() => {}}
          onPressCell={() => {}}
          onPressEvent={(event) => {
            onPressEvent?.(event);
          }}
          mode="day"
          overlapOffset={64}
          locale="pt-br"
          eventCellStyle={{ minHeight: 27 }}
          height={appMetrics.SCREEN_HEIGHT / 1.2}
          events={events}
        />
      </ScrollView>
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  baseStyle: {
    zIndex: 2,
  },
  calendarStrip: {
    height: 130,
    paddingVertical: 10,
  },
  calendarHeaderStyle: {
    color: theme.colors.white,
  },
  dateNumberStyle: {
    color: theme.colors.white,
  },
  dateNameStyle: {
    color: theme.colors.white,
  },
  highlightDateNumberStyle: {
    color: theme.colors.grey[500],
  },
  highlightDateNameStyle: { color: theme.colors.grey[500] },
  disabledDateNameStyle: { color: theme.colors.grey[500] },
  disabledDateNumberStyle: { color: theme.colors.grey[500] },
  scrollView: {
    marginTop: -100,
    zIndex: 1,
    backgroundColor: theme.colors.background,
  },
}));
