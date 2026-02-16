import { useTheme } from "@/shared/libs/utils";
import { Button, Footer, Loading, WeekCalendar } from "@/shared/ui";
import { useRequestInfiniteList } from "@/slices/appointments/entities/request/requestInfiniteList.hook";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export const HomePage = () => {
  const navigation = useNavigation();
  const { setSelectedDate, selectedDate, requestList, isFetching } =
    useRequestInfiniteList();
  const viewRequestDetails = (item) => {
    navigation.navigate("MyRequestsDetailsOwner", {
      item: {
        ...item,
        start: String(item?.start),
        end: String(item?.end),
      },
    });
  };
  const theme = useTheme();
  const buttonProps = {
    backgroundColor: theme.colors.primary[500],
    onPress: () => navigation.navigate("CreateRequestOwner"),
    isFetching,
  };
  return (
    <>
      {isFetching && <Loading color="#fff" size={60} />}
      <WeekCalendar
        onDateSelected={setSelectedDate}
        selectedDate={selectedDate}
        onPressEvent={(event) => viewRequestDetails(event)}
        events={requestList}
      >
        <Footer>
          <Button {...buttonProps}>
            <Button.Title color={theme.colors.white}>CRIAR AGENDAMENTO</Button.Title>
          </Button>
        </Footer>
      </WeekCalendar>

      <StatusBar style="auto" />
    </>
  );
};
