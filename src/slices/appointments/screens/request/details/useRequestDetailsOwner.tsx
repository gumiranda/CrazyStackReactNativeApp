import { useUi } from "@/app/providers";
import { useGetClientById } from "@/slices/appointments/entities/client/client.lib";
import { useGetServiceById } from "@/slices/appointments/entities/service/service.lib";
import { api } from "@/shared/api";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { editRequestMutation } from "@/slices/appointments/features/request/edit/editRequest.hook";

export const useRequestDetailsOwner = ({ serviceId, clientId, currentRequest }) => {
  const { showModal } = useUi();
  const navigation = useNavigation();
  const { data: service } = useGetServiceById(serviceId);
  const { data: client } = useGetClientById(clientId);
  const onSuccess = () => {
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: "HomePage" }] })
    );
  };
  const onError = () => {
    showModal({
      content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
      title: "Erro no servidor",
      type: "error",
    });
  };
  const editRequest = editRequestMutation({
    currentRequest,
    showModal,
    routeRedirect: "HomePage",
    content: "Agendamento confirmado com sucesso, já pode ser visualizado na agenda.",
    navigation,
  });
  const updateRequest = async (newRequest) => {
    await editRequest.mutateAsync(newRequest);
  };
  const deleteRequest = useMutation({
    onError,
    onSuccess,
    mutationFn: async (requestsToDelete: any = []) => {
      try {
        if (requestsToDelete.length > 0) {
          return Promise.all(
            requestsToDelete?.map?.((request: any) =>
              Promise.all([api.delete(`/appointment/delete?requestId=${request._id}`)])
            )
          );
        }
        return null;
      } catch (error) {
        onError();
      }
    },
  });
  const deleteRequestAction = async (item) => {
    await deleteRequest.mutateAsync([item] as any);
  };
  return {
    updateRequest,
    deleteRequestAction,
    service,
    client,
    editRequest,
  };
};
