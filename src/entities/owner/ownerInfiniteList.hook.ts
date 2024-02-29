import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useUi } from "@/app/providers";
import { useGetInfiniteOwners } from "@/entities/owner/owner.lib";
import { queryClientInstance } from "@/shared/api/queryClient";
import { useEffect, useState } from "react";

export const useOwnerInfiniteList = ({ defaultParams = {} }) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { showModal, loading } = useUi();
  const [params, setParams] = useState<any>(defaultParams);

  const all = useGetInfiniteOwners(
    {
      getNextPageParam: (lastPage: any) => lastPage.next,
      getPreviousPageParam: (firstPage: any) => firstPage.prev,
    } as any,
    params
  );
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["ownersInfinite", params],
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
    deleteOwner.mutateAsync([item] as any);
  };
  const deleteOwner = useMutation({
    mutationFn: async (ownersToDelete: any = []) => {
      try {
        if (ownersToDelete?.length > 0) {
          return Promise.all(
            ownersToDelete?.map?.((owner: any) =>
              api.delete(`/owner/delete?_id=${owner._id}`)
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
      queryClientInstance.invalidateQueries(["ownersInfinite", data?.pages ?? 1] as any);
      queryClientInstance.refetchQueries(["ownersInfinite", data?.pages] as any);
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
  const ownerList =
    data?.pages
      ?.map?.((page: any) => page?.owners)
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
    ownerList,
  };
};
