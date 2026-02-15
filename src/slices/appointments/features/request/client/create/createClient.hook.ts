import { useUi } from "@/app/providers";
import { useMutation } from "@tanstack/react-query";
import {
  CreateClientFormData,
  SubmitCreateClientHandler,
  useCreateClientLib,
} from "./createClient.lib";
import { api } from "@/shared/api";
import { SERVER_ERROR_MESSAGE } from "@/shared/libs/utils/constants";

export const useCreateClient = ({ userList, owner }) => {
  const { showModal } = useUi();
  const createClient = useCreateClientMutation(showModal, null);
  const { handleSubmit, formState, ...formProps } = useCreateClientLib();
  const handleCreateClient: SubmitCreateClientHandler = async (
    data: CreateClientFormData
  ) => {
    await createClient.mutateAsync({
      ...data,
      userId: userList?.[0]._id,
      myOwnerId: owner?.createdById,
      ownerId: owner?._id,
    });
  };
  return {
    formState,
    handleSubmit,
    handleCreateClient,
    createClient,
    ...formProps,
  };
};
export function useCreateClientMutation(showModal, navigation) {
  return useMutation({
    mutationFn: async (client: CreateClientFormData) => {
      try {
        const { data } = await api.post("/client/add", client);
        if (!data) {
          showModal({
            content: SERVER_ERROR_MESSAGE,
            title: "Erro no servidor",
            type: "error",
          });
          return;
        }

        if (navigation) {
          showModal({
            content:
              "Cliente criada com sucesso, você será redirecionado para a lista de clientes",
            title: "Sucesso",
            type: "success",
          });
          navigation.navigate("HomePage");
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
