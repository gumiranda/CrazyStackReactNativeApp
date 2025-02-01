import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useUi } from "@/app/providers";
import { useGetInfiniteOwners } from "./owner.lib";
import { useEffect, useState } from "react";

export const useOwnerInfiniteList = ({ defaultParams = {} }) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { showModal, loading } = useUi();
  const [params, setParams] = useState<any>(defaultParams);

  const all = useGetInfiniteOwners(
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
  const invalidateOwnerListQuery = () => {
    queryClient.invalidateQueries({ queryKey: ["ownersInfinite", params] });
  };
  const handleError = () => {
    showModal({
      content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
      title: "Erro no servidor",
      type: "error",
    });
  };
  useEffect(() => {
    invalidateOwnerListQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  const mutationFn = async (items: any) => {
    try {
      if (items?.length > 0) {
        return Promise.all(
          items?.map?.((item: any) => api.delete(`/owner/delete?_id=${item._id}`))
        );
      }
      return null;
    } catch (error) {
      handleError();
    }
  };
  const deleteOwner = useMutation({
    mutationFn,
    onSuccess: () => {
      invalidateOwnerListQuery();
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
    deleteOwner.mutateAsync([item] as any);
  };
  const ownerList =
    pages
      ?.map?.((page: any) => page?.owners)
      ?.reduce?.((a: any, b: any) => a.concat(b)) ?? [];
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
