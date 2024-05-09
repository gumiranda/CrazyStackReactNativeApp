import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps,
  SelectHookForm,
} from "@/shared/ui";
import { format } from "date-fns";
import { useState } from "react";
import { useTimeAvailable } from "../../../appointment/timeAvailable.hook";
import { useSelectDate } from "./SelectDate.lib";
import { ScrollView } from "react-native";
import { getPlatformDate } from "@/shared/libs/functions";
export const SelectDate = ({
  currentOwner,
  externalOnSubmit,
  request,
  buttonTitle = "CONFIRMAR",
}) => {
  const theme = useTheme();
  const [dateSelectedString, setDateSelectedString] = useState<string | null>(
    format(new Date(), "dd/MM/yyyy")
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const { timeAvailable, timeSelected, handleChangeTimeSelected } = useTimeAvailable({
    ownerId: currentOwner?._id,
    professionalId: request?.professionalId,
    serviceId: request?.serviceId,
    date: dateSelectedString,
  });
  const currentService = request?.services?.find?.(
    (service) => service?._id === request?.serviceId
  );
  const requestObjectIds = {};
  const serviceDuration = currentService?.duration ?? 60;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useSelectDate();
  const handleChangeDate = (date: DayProps) => {
    let start = date;
    let end = date;
    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }
    setDateSelectedString(
      format(getPlatformDate(new Date(date.timestamp)), "dd/MM/yyyy")
    );
    const interval = generateInterval(start, end, theme);
    setMarkedDates(interval);
  };
  const onSubmit = (values: any) => {
    externalOnSubmit({
      requestToSend: { ...values, ...requestObjectIds },
      currentService,
    });
  };
  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollView} style={styles.content}>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </ScrollView>
    </>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({ scrollView: {}, content: {} }));
