//  import { useStepRequest } from "../context/StepRequest.context";
// import { useEffect, useState } from "react";
// import { useTimeAvailable } from "@/features/appointment/timeAvailable.hook";
// import { addMinutes } from "date-fns";

export const StepDate = ({ currentOwner, nextStep }) => {
  // const { request, setRequest } = useStepRequest() || {};

  // const [dateSelected, setDateSelected] = useState(null);
  // const { timeAvailable, timeSelected, handleChangeTimeSelected } = useTimeAvailable({
  //   ownerId: currentOwner?._id,
  //   professionalId: request?.professionalId,
  //   serviceId: request?.serviceId,
  //   date: dateSelected ?? null,
  // });
  // const currentService = request?.services?.find?.(
  //   (service) => service?._id === request?.serviceId
  // );
  // const serviceDuration = currentService?.duration ?? 60;

  // const requestObjectIds = {
  //   haveDelivery: false,
  //   haveRecurrence: false,
  //   haveFidelity: false,
  //   haveRide: false,
  //   type: "service",
  //   status: 1,
  //   serviceId: request?.serviceId,
  //   clientId: request?.clientCreated?._id,
  //   professionalId: request?.professionalId,
  //   ownerId: currentOwner?._id,
  //   createdForId: currentOwner?.createdById,
  //   clientUserId: request?.clientUserId,
  //   initDate: timeSelected ?? timeAvailable?.timeAvailable?.[0]?.value,
  //   endDate: addMinutes(
  //     new Date(timeSelected ?? timeAvailable?.timeAvailable?.[0]?.value ?? null),
  //     serviceDuration
  //   )?.toISOString(),
  //   duration: serviceDuration,
  //   serviceName: currentService?.name,
  //   ownerName: currentOwner?.name,
  //   clientName: request?.clientCreated?.name,
  //   professionalName: request?.users?.find?.(
  //     (user) => user?._id === request?.professionalId
  //   )?.name,
  // };
  // //  const createRequest = createRequestMutation(showModal, router);
  // const createRequest = createRequestMutation(() => {}, null);

  // const { register, handleSubmit, formState } = useCreateRequestLib(requestObjectIds);
  // const handleCreateRequest: SubmitCreateRequestHandler = async (
  //   values: CreateRequestFormData
  // ) => {
  //   setRequest((prev) => ({
  //     ...prev,
  //     requestToSend: { ...values, ...requestObjectIds },
  //     currentService,
  //   }));

  //   await createRequest.mutateAsync({
  //     ...values,
  //     ...requestObjectIds,
  //   });
  // };
  // useEffect(() => {
  //   if (createRequest?.data) {
  //     setRequest((prev) => ({ ...prev, requestCreated: createRequest?.data }));
  //     nextStep();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [createRequest?.data]);
  return (
    <>
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
    </>
  );
};
