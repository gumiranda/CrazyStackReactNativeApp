import { useUi } from "@/app/providers";
import { useGetClientById } from "@/entities/client/client.lib";
import { useGetServiceById } from "@/entities/service/service.lib";
import { editRequestMutation } from "@/features/request/edit/editRequest.hook";
import { api } from "@/shared/api";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";

export const useRequestDetailsOwner = ({ serviceId, clientId, currentRequest }) => {
  const { showModal } = useUi();
  const navigation = useNavigation();

  const { data: service } = useGetServiceById(serviceId);
  const { data: client } = useGetClientById(clientId);
  const onSuccess = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "HomePage" }],
      })
    );
  };
  const onError = () => {
    showModal({
      content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
      title: "Erro no servidor",
      type: "error",
    });
  };
  const updateRequest = async (newRequest: any) => {
    await editRequest.mutateAsync(newRequest as any);
    // if (newRequest.status === 4) {
    //   deleteSelectedAction(newRequest);
    // }
  };
  const deleteSelectedAction = async (item: any) => {
    deleteRequest.mutateAsync([item] as any);
  };
  const deleteRequest = useMutation({
    mutationFn: async (requestsToDelete: any = []) => {
      try {
        if (requestsToDelete?.length > 0) {
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
    onSuccess,
    onError,
    retry: 3,
  } as any);
  const editRequest = editRequestMutation({
    currentRequest,
    showModal,
    routeRedirect: "HomePage",
    content: "Agendamento confirmado com sucesso, já pode ser visualizado na agenda.",
    navigation,
  });
  return { service, client, deleteSelectedAction, updateRequest, editRequest };
};
