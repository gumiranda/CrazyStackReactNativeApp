import { useAuth, useUi } from "@/app/providers";
import appMetrics from "@/shared/libs/functions/metrics";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import { Button } from "@/shared/ui";
import { ScrollView, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Calendar } from "react-native-big-calendar";
import CalendarStrip from "react-native-calendar-strip";
import { addDays, addHours } from "date-fns";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRequestInfiniteList } from "@/features/request/list/requestInfiniteList.hook";

export const HomePage = () => {
  const navigation = useNavigation();
  const { setLoading } = useUi();
  const { user } = useAuth();
  const theme = useTheme();
  const datesBlacklist = [];
  const {
    isFetching,
    error,
    data: fetchData,
    fetchNextPage,
    hasNextPage,
    deleteSelectedAction,
    loading,
    selectedDate,
    setSelectedDate,
  } = useRequestInfiniteList();
  const requestList =
    fetchData?.pages
      ?.map?.((page: any) => page?.requests)
      ?.reduce?.((a: any, b: any) => a.concat(b)) ??
    fetchData ??
    [];
  console.tron.log({ requestList });
  const datesWhitelist = [
    {
      start: addDays(new Date(), -365) as any,
      end: addDays(new Date(), 365) as any,
    },
  ];
  const viewRequestDetails = (item) => {
    navigation.navigate("MyRequestsDetailsOwner", {
      item: {
        ...item,
        start: String(item?.start),
        end: String(item?.end),
      },
    });
  };
  useEffect(() => {
    fetchNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage]);
  useEffect(() => {
    setLoading(isFetching);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);
  return (
    <>
      <View style={{ zIndex: 2 }}>
        <CalendarStrip
          scrollable
          scrollerPaging
          onDateSelected={setSelectedDate}
          selectedDate={selectedDate}
          daySelectionAnimation={
            {
              type: "border",
              borderWidth: 1,
              borderHighlightColor: theme.colors.white,
            } as any
          }
          style={{ height: 130, paddingVertical: 10 }}
          calendarHeaderStyle={{ color: theme.colors.white }}
          calendarColor={theme.colors.primary[500]}
          dateNumberStyle={{ color: theme.colors.white }}
          dateNameStyle={{ color: theme.colors.white }}
          highlightDateNumberStyle={{ color: theme.colors.grey[500] }}
          highlightDateNameStyle={{ color: theme.colors.grey[500] }}
          disabledDateNameStyle={{ color: theme.colors.grey[500] }}
          disabledDateNumberStyle={{ color: theme.colors.grey[500] }}
          datesWhitelist={datesWhitelist}
          datesBlacklist={datesBlacklist}
        />
      </View>
      <ScrollView style={styles.container}>
        <Calendar
          date={selectedDate}
          onChangeDate={() => {}}
          onPressCell={() => {}}
          onPressEvent={(event) => {
            viewRequestDetails(event);
          }}
          mode="day"
          overlapOffset={64}
          eventCellStyle={{ minHeight: 27 }}
          locale="pt-br"
          events={
            requestList?.map?.((request) => {
              const title = `${request?.professionalName ?? "Profissional"} - ${request?.name ?? "Cliente"}`;
              const start = addHours(new Date(request?.initDate), 3);
              const end = addHours(new Date(request?.endDate), 3);
              return { ...request, title, start, end };
            }) ?? []
          }
          height={appMetrics.SCREEN_HEIGHT / 1.2}
        />
      </ScrollView>
    </>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    marginTop: -100,
    zIndex: 1,
  },
}));
