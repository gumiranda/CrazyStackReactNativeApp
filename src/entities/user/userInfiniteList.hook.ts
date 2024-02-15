import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useUi } from "@/app/providers";
import { useGetInfiniteUsers } from "@/entities/user/user.lib";
import { queryClientInstance } from "@/shared/api/queryClient";
import { useEffect, useState } from "react";

export const useUserInfiniteList = ({ defaultParams = {} }) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { showModal, loading } = useUi();
  const [params, setParams] = useState<any>(defaultParams);

  const all = useGetInfiniteUsers(
    {
      getNextPageParam: (lastPage: any) => lastPage.next,
      getPreviousPageParam: (firstPage: any) => firstPage.prev,
    } as any,
    params
  );
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["usersInfinite", params],
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
    deleteUser.mutateAsync([item] as any);
  };
  const deleteUser = useMutation({
    mutationFn: async (usersToDelete: any = []) => {
      try {
        if (usersToDelete?.length > 0) {
          return Promise.all(
            usersToDelete?.map?.((user: any) =>
              api.delete(`/user/delete?_id=${user._id}`)
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
      queryClientInstance.invalidateQueries(["usersInfinite", data?.pages ?? 1] as any);
      queryClientInstance.refetchQueries(["usersInfinite", data?.pages] as any);
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
  const userList =
    data?.pages
      ?.map?.((page: any) => page?.users)
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
    userList,
  };
};
