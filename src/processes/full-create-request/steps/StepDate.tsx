// import { useEffect, useState } from "react";
// import { useTimeAvailable } from "@/features/appointment/timeAvailable.hook";
// import { addMinutes } from "date-fns";

import { ScrollView } from "react-native";
import { useStepRequest } from "../context/StepRequest.context";
import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import appMetrics from "@/shared/libs/functions/metrics";
import {
  Button,
  Calendar,
  DayProps,
  MarkedDateProps,
  SelectHookForm,
  generateInterval,
} from "@/shared/ui";
import { useEffect, useState } from "react";
import { getPlatformDate } from "@/shared/libs/functions/getPlatformDate";
import { addMinutes, format } from "date-fns";
import { useTimeAvailable } from "@/features/appointment/timeAvailable.hook";
import { useStepDate } from "./StepDate.lib";
import { createRequestMutation } from "@/features/request/create/createRequest.hook";

export const StepDate = ({ currentOwner, nextStep }) => {
  const { request, setRequest } = useStepRequest() || {};
  const theme = useTheme();
  console.tron.log({ request });
  const [dateSelectedString, setDateSelectedString] = useState<string | null>(null);
  const [dateSelected, setDateSelected] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<any>({} as any);
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
  } = useStepDate();

  const createRequest = createRequestMutation(() => {}, null);

  const handleCreateRequest = async (values: any) => {
    setRequest((prev) => ({
      ...prev,
      requestToSend: { ...values, ...requestObjectIds },
      currentService,
    }));

    await createRequest.mutateAsync({
      ...values,
      ...requestObjectIds,
    });
  };
  useEffect(() => {
    if (createRequest?.data) {
      setRequest((prev) => ({ ...prev, requestCreated: createRequest?.data }));
      nextStep();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createRequest?.data]);

  const handleChangeDate = (date: DayProps) => {
    let start = date;
    let end = date;
    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }
    setDateSelected(end);
    setDateSelectedString(
      format(getPlatformDate(new Date(date?.timestamp)), "dd/MM/yyyy")
    );
    const interval = generateInterval(start, end, theme);
    setMarkedDates(interval);
    const keysInterval = Object.keys(interval);
    const firstDate = keysInterval?.[0];
    const lastDate = keysInterval?.[keysInterval?.length - 1];
    setRentalPeriod({
      start: start.timestamp,
      end: end.timestamp,
      startFormatted: format(getPlatformDate(new Date(firstDate)), "dd/MM/yyyy"),
      endFormatted: format(getPlatformDate(new Date(lastDate)), "dd/MM/yyyy"),
    });
  };
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 24,
          paddingHorizontal: 10,
          paddingTop: 0,
          alignItems: "stretch",
        }}
        style={styles.content}
      >
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
        <SelectHookForm
          list={timeAvailable?.timeAvailable ?? []}
          keyValue={"value"}
          keyLabel={"label"}
          defaultValue={timeSelected}
          placeholder={"Selecione um horário"}
          control={control}
          errors={errors}
          name={"timeAvailable"}
          label={"Horário disponível"}
          extraOnChange={handleChangeTimeSelected}
        />
      </ScrollView>
      {/* <DatePicker
        placeholder="Selecione uma data"
        name="date"
        label="Data do agendamento"
        bgColor="gray.100"
        labelColor="black"
        onChange={(date: string) => {
          setDateSelected(date as any);
        }}
      />
      {currentOwner?._id?.length === 24 && timeAvailable?.timeAvailable?.length > 0 && (
        <Select
          bg="purple.700"
          name="timeList"
          label="Horário disponível"
          list={timeAvailable?.timeAvailable ?? []}
          value={timeSelected ?? ""}
          onChange={handleChangeTimeSelected}
          keyValue="value"
          keyLabel="label"
          labelColor="black"
          bgColor="gray.100"
        />
      )}
      <FormControl
        label="Observação"
        labelColor="black"
        bgColor="gray.100"
        bgColorHover="gray.100"
        error={formState.errors.message}
        {...register("message")}
      /> */}
      <Button
        style={styles.button}
        onPress={handleSubmit(handleCreateRequest)}
        title={"CONFIRMAR"}
        backgroundColor={theme.colors.tertiary[300]}
        color={theme.colors.black}
      />
    </>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
  button: {
    width: appMetrics.SCREEN_WIDTH * 0.9,
    alignSelf: "center",
  },
  text: {
    color: theme.colors.text,
  },
  footer: { backgroundColor: theme.colors.white },
  content: {},
}));
