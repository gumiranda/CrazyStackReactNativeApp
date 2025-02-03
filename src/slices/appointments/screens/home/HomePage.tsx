import { useUi } from "@/app/providers";
import { useTheme } from "@/shared/libs/utils";
import { Button, Footer, WeekCalendar } from "@/shared/ui";
import { useRequestInfiniteList } from "@/slices/appointments/entities/request/requestInfiniteList.hook";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

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
  const { setLoading } = useUi();
  const theme = useTheme();
  useEffect(() => {
    setLoading(isFetching);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);
  const buttonProps = {
    backgroundColor: theme.colors.primary[500],
    title: "CRIAR AGENDAMENTO",
    color: theme.colors.white,
    onPress: () => navigation.navigate("CreateRequestOwner"),
    isFetching,
  };
  return (
    <>
      <WeekCalendar
        onDateSelected={setSelectedDate}
        selectedDate={selectedDate}
        onPressEvent={(event) => viewRequestDetails(event)}
        events={requestList}
      >
        <Footer>
          <Button {...buttonProps} />
        </Footer>
      </WeekCalendar>

      <StatusBar style="auto" />
    </>
  );
};
