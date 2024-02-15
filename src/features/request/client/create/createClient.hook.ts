/* eslint-disable react-hooks/rules-of-hooks */
import { useUi } from "@/app/providers";
import {
  CreateClientFormData,
  SubmitCreateClientHandler,
  useCreateClientLib,
} from "./createClient.lib";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { useUsersSelect } from "@/features/user/userList.hook";

export const useCreateClient = ({ userList }) => {
  const navigation = useNavigation();
  const { showModal } = useUi();
  const { userSelected, handleChangeUserSelected, users } = useUsersSelect({
    role: "client",
    userList,
  });
  const createClient = createClientMutation(showModal, navigation);
  const { handleSubmit, formState, ...formProps } = useCreateClientLib();
  const handleCreateClient: SubmitCreateClientHandler = async (
    values: CreateClientFormData
  ) => {
    await createClient.mutateAsync({
      ...values,
      userId: userSelected ?? users?.[0]?._id,
    });
  };
  return {
    formState,
    handleSubmit,
    handleCreateClient,
    userSelected,
    handleChangeUserSelected,
    users,
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
        showModal({
          content:
            "Cliente criada com sucesso, você será redirecionado para a lista de clientes",
          title: "Sucesso",
          type: "success",
        });
        if (navigation) {
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
