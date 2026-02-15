import { api } from "@/shared/api";
import { SERVER_ERROR_MESSAGE } from "@/shared/libs/utils/constants";
import { CreateRequestFormData } from "./createRequest.lib";
import { useMutation } from "@tanstack/react-query";

export function useCreateRequestMutation(showModal: Function, navigation) {
  return useMutation({
    mutationFn: async (request: CreateRequestFormData) => {
      try {
        const { data } = await api.post("/request/add", {
          ...request,
          message: (request?.message ?? "") + " ",
        });
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
          content: SERVER_ERROR_MESSAGE,
          title: "Erro no servidor",
          type: "error",
        });
      }
    },
  });
}
