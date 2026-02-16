import {
  EditRequestFormData,
  EditRequestFormProps,
  SubmitEditRequestHandler,
  useEditRequestLib,
} from "./editRequest.lib";
import { api } from "@/shared/api";
import { SERVER_ERROR_MESSAGE } from "@/shared/libs/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { addMinutes } from "date-fns";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useUi } from "@/app/providers";
import { useTimeAvailable } from "../../appointment";
import { RequestProps } from "@/slices/appointments/entities/request";
export const useEditRequest = (props: EditRequestFormProps) => {
  const navigation = useNavigation();
  const { showModal } = useUi();
  const { request: currentRequest } = props;
  const [dateChanged, setDateChanged] = useState(false);
  const [dateSelected, setDateSelected] = useState<any>(
    currentRequest?.datePickerSelected
  );
  const { timeAvailable, timeSelected, handleChangeTimeSelected } = useTimeAvailable({
    ownerId: currentRequest?.createdForId,
    professionalId: currentRequest?.professionalId,
    serviceId: currentRequest?.serviceId,
    date: dateSelected ?? null,
  });
  const [statusSelected, setStatusSelected] = useState<number>(
    currentRequest?.status ?? 0
  );
  const handleChangeStatus = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatusSelected(event.target.value as number);
  };
  const editRequest = useEditRequestMutation({
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
    data: EditRequestFormData
  ) => {
    const newTime = timeSelected ?? timeAvailable?.timeAvailable?.[0]?.value ?? null;
    await editRequest.mutateAsync({
      ...data,
      date,
      professionalId,
      ownerId,
      serviceId,
      status: statusSelected,
      clientId,
      initDate: dateChanged ? newTime : initDate,
      endDate: dateChanged ? addMinutes(newTime, duration).toISOString() : endDate,
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
export function useEditRequestMutation({
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
        const { timeAvailable: _ta, type: _type, ...requestData } = request ?? {};
        const body = {
          ...requestData,
          updatedAt: new Date(),
        };
        const { data } = await api.patch(
          `/request/update?_id=${currentRequest._id}`,
          body
        );
        if (!data) {
          showModal({
            content: SERVER_ERROR_MESSAGE,
            title: "Erro no servidor",
            type: "error",
          });
          return;
        }
        showModal({
          content:
            content ??
            "Solicitação editada com sucesso, você será redirecionado para a home",
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
          content: SERVER_ERROR_MESSAGE,
          title: "Erro no servidor",
          type: "error",
        });
      }
    },
  });
}
