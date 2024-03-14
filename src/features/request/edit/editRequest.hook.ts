/* eslint-disable indent */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  EditRequestFormData,
  EditRequestFormProps,
  SubmitEditRequestHandler,
  useEditRequestLib,
} from "./editRequest.lib";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTimeAvailable } from "@/features/appointment/timeAvailable.hook";
import { addMinutes } from "date-fns";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useUi } from "@/app/providers";
import { RequestProps } from "@/entities/request";

export const useEditRequest = (props: EditRequestFormProps) => {
  const navigation = useNavigation();
  const { showModal } = useUi();
  const { request: currentRequest } = props;
  const [dateChanged, setDateChanged] = useState(false);
  const [dateSelected, setDateSelected] = useState(currentRequest?.datePickerSelected);
  const { timeAvailable, timeSelected, handleChangeTimeSelected } = useTimeAvailable({
    ownerId: currentRequest?.createdForId,
    professionalId: currentRequest?.professionalId,
    serviceId: currentRequest?.serviceId,
    date: dateSelected ?? null,
  });
  const [statusSelected, setStatusSelected] = useState<number>(currentRequest?.status);
  const handleChangeStatus = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatusSelected(event.target.value as number);
  };
  const editRequest = editRequestMutation({
    currentRequest,
    showModal,
    navigation,
    routeRedirect: "HomePage",
    content:
      "Solicitação editada com sucesso, você será redirecionado para a lista de solicitações",
  });
  const { register, handleSubmit, formState } = useEditRequestLib(props);
  const {
    professionalId,
    date,
    ownerId,
    serviceId,
    clientId,
    initDate,
    endDate,
    duration = 60,
  } = currentRequest || {};
  const handleEditRequest: SubmitEditRequestHandler = async (
    values: EditRequestFormData
  ) => {
    await editRequest.mutateAsync({
      ...values,
      date,
      professionalId,
      ownerId,
      serviceId,
      status: statusSelected,
      clientId,
      initDate: dateChanged
        ? timeSelected ?? timeAvailable?.timeAvailable?.[0]?.value
        : initDate,
      endDate: dateChanged
        ? addMinutes(
            new Date(timeSelected ?? timeAvailable?.timeAvailable?.[0]?.value ?? null),
            duration
          ).toISOString()
        : endDate,
    });
  };
  return {
    formState,
    register,
    handleSubmit,
    handleEditRequest,
    statusSelected,
    handleChangeStatus,
    dateSelected,
    setDateSelected,
    timeAvailable,
    timeSelected,
    handleChangeTimeSelected,
    dateChanged,
    setDateChanged,
  };
};

export function editRequestMutation({
  currentRequest,
  showModal,
  navigation = null,
  content,
  routeRedirect,
}: {
  currentRequest: RequestProps;
  showModal: Function;
  navigation?: any;
  content: string;
  routeRedirect: string;
}) {
  return useMutation({
    mutationFn: async (request: EditRequestFormData) => {
      try {
        const { data } = await api.patch(`/request/update?_id=${currentRequest._id}`, {
          ...request,
          updatedAt: new Date(),
        });
        if (!data) {
          showModal({
            content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
            title: "Erro no servidor",
            type: "error",
          });
          return;
        }
        showModal({
          content,
          title: "Sucesso",
          type: "success",
        });
        if (navigation) {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: routeRedirect },
                { name: "MyRequestsDetailsOwner", params: { item: data } },
              ],
            })
          );
        }
        return data;
      } catch (error) {
        showModal({
          content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          title: "Erro no servidor",
          type: "error",
        });
      }
    },
  });
}
