import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useUi } from "@/app/providers";
import { SERVER_ERROR_MESSAGE } from "@/shared/libs/utils/constants";
import { useGetInfinitePlaces } from "./place.lib";
import { useEffect, useState } from "react";

export const usePlaceInfiniteList = ({ defaultParams = {} }) => {
  const queryPlace = useQueryClient();
  const navigation = useNavigation();
  const { showModal, loading } = useUi();
  const [params, setParams] = useState<any>(defaultParams);

  const all = useGetInfinitePlaces(
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
  const invalidatePlaceListQuery = () => {
    queryPlace.invalidateQueries({ queryKey: ["placesInfinite", params] });
  };
  const handleError = () => {
    showModal({
      content: SERVER_ERROR_MESSAGE,
      title: "Erro no servidor",
      type: "error",
    });
  };
  useEffect(() => {
    invalidatePlaceListQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  const mutationFn = async (items: any) => {
    try {
      if (items?.length > 0) {
        return Promise.all(
          items?.map?.((item: any) => api.delete("/place/delete", { params: { _id: item._id } }))
        );
      }
      return null;
    } catch (error) {
      handleError();
    }
  };
  const deletePlace = useMutation({
    mutationFn,
    onSuccess: () => {
      invalidatePlaceListQuery();
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
    deletePlace.mutateAsync([item] as any);
  };
  const placeList =
    pages
      ?.map?.((page: any) => page?.places)
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
    placeList,
  };
};
