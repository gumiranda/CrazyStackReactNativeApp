/* eslint-disable react-hooks/rules-of-hooks */
import {
  CreateClientFormData,
  SubmitCreateClientHandler,
  useCreateClientLib,
} from "./createClient.lib";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useUi } from "@/app/providers";

export const useCreateClient = ({ userList }) => {
  const { showModal } = useUi();

  const createClient = createClientMutation(showModal, null);
  const { handleSubmit, formState, ...formProps } = useCreateClientLib();
  const handleCreateClient: SubmitCreateClientHandler = async (
    values: CreateClientFormData
  ) => {
    await createClient.mutateAsync({
      ...values,
      userId: userList?.[0]?._id,
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

export function createClientMutation(showModal: Function, navigation) {
  return useMutation({
    mutationFn: async (client: CreateClientFormData) => {
      try {
        const { data } = await api.post("/client/add", {
          ...client,
        });
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
