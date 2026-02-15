import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useUi } from "@/app/providers";
import { SERVER_ERROR_MESSAGE } from "@/shared/libs/utils/constants";
import { useGetInfiniteUsers } from "./user.lib";
import { useEffect, useState } from "react";

export const useUserInfiniteList = ({ defaultParams = {} }) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { showModal, loading } = useUi();
  const [params, setParams] = useState<any>(defaultParams);

  const all = useGetInfiniteUsers(
    {
      getNextPageParam: (lastPage: any) => lastPage.nextPage,
      getPreviousPageParam: (firstPage: any) => firstPage.previousPage,
      initialPageParam: 1,
    },
    params
  );
  const {
    data = {},
    error,
    isFetching,
    isFetchingNextPage,
    status,
    hasNextPage,
    fetchNextPage,
  } = all;
  const { pages } = data as any;
  const firstPage = pages?.[0] ?? { total: 0 };
  const total = firstPage.total;
  const invalidateUserListQuery = () => {
    queryClient.invalidateQueries({ queryKey: ["usersInfinite", params] });
  };
  const handleError = () => {
    showModal({
      content: SERVER_ERROR_MESSAGE,
      title: "Erro no servidor",
      type: "error",
    });
  };
  useEffect(() => {
    invalidateUserListQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  const mutationFn = async (items: any) => {
    try {
      if (items?.length > 0) {
        return Promise.all(
          items?.map?.((item: any) => api.delete("/user/delete", { params: { _id: item._id } }))
        );
      }
      return null;
    } catch (error) {
      handleError();
    }
  };
  const deleteUser = useMutation({
    mutationFn,
    onSuccess: () => {
      invalidateUserListQuery();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "HomePage" }],
        })
      );
    },
    onError: () => {
      handleError();
    },
    retry: 3,
  });
  const deleteSelectedAction = async (item) => {
    deleteUser.mutateAsync([item] as any);
  };
  const userList =
    pages?.map?.((page: any) => page?.users)?.flat() ?? [];
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
