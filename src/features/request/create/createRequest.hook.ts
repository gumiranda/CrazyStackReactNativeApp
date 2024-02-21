/* eslint-disable react-hooks/rules-of-hooks */
import { CreateRequestFormData } from "./createRequest.lib";
import { api } from "@/shared/api";
import { useMutation } from "@tanstack/react-query";
export function createRequestMutation(showModal: Function, router) {
  return useMutation({
    mutationFn: async (request: CreateRequestFormData) => {
      try {
        const { data } = await api.post("/request/add", {
          ...request,
          message: request?.message + " " ?? " ",
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
        if (router) {
          router.push("/requests/edit/" + data?._id);
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
