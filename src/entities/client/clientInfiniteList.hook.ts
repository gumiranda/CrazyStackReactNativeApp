import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useUi } from "@/app/providers";
import { useGetInfiniteClients } from "@/entities/client/client.lib";
import { queryClientInstance } from "@/shared/api/queryClient";
import { useEffect, useState } from "react";

export const useClientInfiniteList = ({ defaultParams = {} }) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { showModal, loading } = useUi();
  const [params, setParams] = useState<any>(defaultParams);

  const all = useGetInfiniteClients(
    {
      getNextPageParam: (lastPage: any) => lastPage.next,
      getPreviousPageParam: (firstPage: any) => firstPage.prev,
    } as any,
    params
  );
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["clientsInfinite", params],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  }: any = all || {};
  const firstPage: any = data?.pages[0];
  const total: any = (firstPage?.total as any) || {};
  const deleteSelectedAction = async (item: any) => {
    deleteClient.mutateAsync([item] as any);
  };
  const deleteClient = useMutation({
    mutationFn: async (clientsToDelete: any = []) => {
      try {
        if (clientsToDelete?.length > 0) {
          return Promise.all(
            clientsToDelete?.map?.((client: any) =>
              api.delete(`/client/delete?_id=${client._id}`)
            )
          );
        }
        return null;
      } catch (error) {
        showModal({
          content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          title: "Erro no servidor",
          type: "error",
        });
      }
    },
    onSuccess: () => {
      queryClientInstance.invalidateQueries(["clientsInfinite", data?.pages ?? 1] as any);
      queryClientInstance.refetchQueries(["clientsInfinite", data?.pages] as any);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "HomePage" }],
        })
      );
    },
    onError: () => {
      showModal({
        content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
        title: "Erro no servidor",
        type: "error",
      });
    },
    retry: 3,
  } as any);
  const clientList =
    data?.pages
      ?.map?.((page: any) => page?.clients)
      ?.reduce?.((a: any, b: any) => a.concat(b)) ??
    data ??
    [];
  return {
    deleteSelectedAction,
    isFetching,
    error,
    total,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    loading,
    params,
    setParams,
    clientList,
  };
};
