/* eslint-disable react-hooks/rules-of-hooks */
import { useUi } from "@/app/providers";
import { useMutation } from "@tanstack/react-query";
import {
  CreateClientFormData,
  SubmitCreateClientHandler,
  useCreateClientLib,
} from "./createClient.lib";
import { api } from "@/shared/api";

export const useCreateClient = ({ userList, owner }) => {
  const { showModal } = useUi();
  const createClient = createClientMutation(showModal, null);
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
export function createClientMutation(showModal, navigation) {
  return useMutation({
    mutationFn: async (client: CreateClientFormData) => {
      try {
        const { data } = await api.post("/client/add", client);
        if (!data) {
          showModal({
            content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
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
          content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          title: "Erro no servidor",
          type: "error",
        });
      }
    },
  });
}
