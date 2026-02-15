/* eslint-disable react-hooks/rules-of-hooks */
import { api } from "@/shared/api";
import { CreateRequestFormData } from "./createRequest.lib";
import { useMutation } from "@tanstack/react-query";

export function createRequestMutation(showModal: Function, navigation) {
  return useMutation({
    mutationFn: async (request: CreateRequestFormData) => {
      try {
        const { data } = await api.post("/request/add", {
          ...request,
          message: (request?.message ?? "") + " ",
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
            "Solicitação criada com sucesso, você será redirecionado para a lista de solicitações",
          title: "Sucesso",
          type: "success",
        });
        if (navigation) {
          navigation.navigate("MyRequestsDetailsOwner", { item: data });
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
