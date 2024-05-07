import { Footer, WeekCalendar } from "@/shared/ui";
import { useRequestInfiniteList } from "@/slices/appointments/entities/request/requestInfiniteList.hook";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export const HomePage = () => {
  const navigation = useNavigation();
  const { setSelectedDate, selectedDate, requestList } = useRequestInfiniteList();
  const viewRequestDetails = (item) => {
    navigation.navigate("MyRequestsDetailsOwner", {
      item: {
        ...item,
        start: String(item?.start),
        end: String(item?.end),
      },
    });
  };
  return (
    <>
      <WeekCalendar
        onDateSelected={setSelectedDate}
        selectedDate={selectedDate}
        onPressEvent={(event) => viewRequestDetails(event)}
        events={requestList}
      />
      <Footer>
        <></>
      </Footer>
      <StatusBar style="auto" />
    </>
  );
};
