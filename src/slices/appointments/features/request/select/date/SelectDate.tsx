import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import {
  Button,
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps,
  SelectHookForm,
} from "@/shared/ui";
import { addMinutes, format } from "date-fns";
import { useState } from "react";
import { useTimeAvailable } from "../../../appointment/timeAvailable.hook";
import { useSelectDate } from "./SelectDate.lib";
import { ScrollView } from "react-native";
import { getPlatformDate } from "@/shared/libs/functions";
import appMetrics from "@/shared/libs/functions/metrics";
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
  const serviceDuration = currentService?.duration ?? 60;
  const requestObjectIds = {
    haveDelivery: false,
    haveRecurrence: false,
    haveFidelity: false,
    haveRide: false,
    type: "service",
    status: 1,
    serviceId: request?.serviceId,
    clientId: request?.clientCreated?._id,
    professionalId: request?.professionalId,
    ownerId: currentOwner?._id,
    createdForId: currentOwner?.createdById,
    clientUserId: request?.clientCreated?.userId,
    initDate: timeSelected ?? timeAvailable?.timeAvailable?.[0]?.value,
    endDate: addMinutes(
      new Date(timeSelected ?? timeAvailable?.timeAvailable?.[0]?.value ?? null),
      serviceDuration
    )?.toISOString(),
    duration: serviceDuration,
    serviceName: currentService?.name,
    ownerName: currentOwner?.name,
    clientName: request?.clientCreated?.name,
    professionalName: request?.users?.find?.(
      (user) => user?._id === request?.professionalId
    )?.name,
  };
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
        {timeAvailable?.timeAvailable?.length > 0 && (
          <SelectHookForm
            list={timeAvailable?.timeAvailable ?? []}
            control={control}
            defaultValue={timeSelected}
            placeholder={"Selecione um horário"}
            keyValue={"value"}
            keyLabel={"label"}
            errors={errors}
            name={"timeAvailable"}
            label={"Horários disponíveis"}
            extraOnChange={handleChangeTimeSelected}
            haveLoadMore={false}
          />
        )}
      </ScrollView>
      <Button
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        backgroundColor={theme.colors.tertiary[300]}
      >
        <Button.Title color={theme.colors.black}>{buttonTitle}</Button.Title>
      </Button>
    </>
  );
};
const styles = DynamicStyleSheet.create(() => ({
  scrollView: {
    paddingBottom: 24,
    paddingHorizontal: 10,
    paddingTop: 0,
    alignItems: "stretch",
  },
  content: {
    margin: 4,
  },
  button: { width: appMetrics.SCREEN_WIDTH * 0.9, alignSelf: "center" },
}));
