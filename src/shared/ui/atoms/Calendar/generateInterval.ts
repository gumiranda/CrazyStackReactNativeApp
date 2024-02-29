import { eachDayOfInterval, format } from "date-fns";
import { DayProps, MarkedDateProps } from "./Calendar";
import { getPlatformDate } from "@/shared/libs/functions/getPlatformDate";

export function generateInterval(start: DayProps, end: DayProps, theme: any) {
  let interval: MarkedDateProps = {};

  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp),
  }).forEach((item) => {
    const date = format(getPlatformDate(item), "yyyy-MM-dd");

    interval = {
      ...interval,
      [date]: {
        color:
          start.dateString === date || end.dateString === date
            ? theme.colors.primary[500]
            : theme.colors.primary[400],

        textColor:
          start.dateString === date || end.dateString === date
            ? theme.colors.white
            : theme.colors.primary[500],
      },
    };
  });

  return interval;
}
