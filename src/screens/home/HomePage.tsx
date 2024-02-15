import appMetrics from "@/shared/libs/functions/metrics";
import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import { ScrollView, View } from "react-native";
import { Calendar } from "react-native-big-calendar";
import CalendarStrip from "react-native-calendar-strip";
import { addDays } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { useRequestInfiniteList } from "@/entities/request";
import { Button, Footer } from "@/shared/ui";
import { StatusBar } from "expo-status-bar";
import { useInfiniteFullList } from "@/shared/libs/hooks";

export const HomePage = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const datesBlacklist = [];
  const {
    isFetching,
    requestList,
    fetchNextPage,
    hasNextPage,
    selectedDate,
    setSelectedDate,
  } = useRequestInfiniteList();
  useInfiniteFullList({ fetchNextPage, hasNextPage, isFetching });
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

  const buttonProps = {
    backgroundColor: theme.colors.primary[500],
    color: theme.colors.white,
    title: "NOVO AGENDAMENTO",
    onPress: () => {
      navigation.navigate("CreateRequestOwner");
    },
    isFetching,
  };
  return (
    <View style={styles.container}>
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
      <ScrollView style={styles.scrollview}>
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
              const start = new Date(request?.initDate);
              const end = new Date(request?.endDate);
              return { ...request, title, start, end };
            }) ?? []
          }
          height={appMetrics.SCREEN_HEIGHT / 1.2}
        />
      </ScrollView>
      <Footer style={styles.footer}>
        <Button {...buttonProps} />
      </Footer>
      <StatusBar style="auto" />
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  scrollview: {
    backgroundColor: theme.colors.background,
    marginTop: -100,
    zIndex: 1,
  },
  container: {
    flex: 1,
  },
  footer: { paddingTop: 10 },
}));
