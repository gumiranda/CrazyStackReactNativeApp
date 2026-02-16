import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useUi } from "@/app/providers";
import { SERVER_ERROR_MESSAGE } from "@/shared/libs/utils/constants";
import { useGetInfiniteCategoryPlaces } from "./categoryPlace.lib";
import { useEffect, useState } from "react";

export const useCategoryPlaceInfiniteList = ({ defaultParams = {} }) => {
  const queryCategoryPlace = useQueryClient();
  const navigation = useNavigation();
  const { showModal, loading } = useUi();
  const [params, setParams] = useState<any>(defaultParams);

  const all = useGetInfiniteCategoryPlaces(
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
  const invalidateCategoryPlaceListQuery = () => {
    queryCategoryPlace.invalidateQueries({
      queryKey: ["categoryplacesInfinite", params],
    });
  };
  const handleError = () => {
    showModal({
      content: SERVER_ERROR_MESSAGE,
      title: "Erro no servidor",
      type: "error",
    });
  };
  useEffect(() => {
    invalidateCategoryPlaceListQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  const mutationFn = async (items: any) => {
    try {
      if (items?.length > 0) {
        return Promise.all(
          items?.map?.((item: any) => api.delete("/categoryplace/delete", { params: { _id: item._id } }))
        );
      }
      return null;
    } catch (error) {
      handleError();
    }
  };
  const deleteCategoryPlace = useMutation({
    mutationFn,
    onSuccess: () => {
      invalidateCategoryPlaceListQuery();
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
    deleteCategoryPlace.mutateAsync([item] as any);
  };
  const categoryplaceList =
    pages
      ?.map?.((page: any) => page?.categoryplaces)
      ?.flat() ?? [];
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
    categoryplaceList,
  };
};
