import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useUi } from "@/app/providers";
import { useGetInfiniteRequests } from "./request.lib";
import { endOfDay, startOfDay } from "date-fns";
import { useEffect, useMemo, useState } from "react";

export const useRequestInfiniteList = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { showModal, loading } = useUi();
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const query = useMemo(
    () => ({
      initDate: startOfDay(new Date(selectedDate)),
      endDate: endOfDay(new Date(selectedDate)),
    }),
    [selectedDate]
  );
  const all = useGetInfiniteRequests(
    {
      getNextPageParam: (lastPage: any) => lastPage.nextPage,
      getPreviousPageParam: (firstPage: any) => firstPage.previousPage,
      initialPageParam: 1,
    },
    query
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
  const invalidateRequestListQuery = () => {
    queryClient.invalidateQueries({ queryKey: ["requestsInfinite", query] });
  };
  const handleError = () => {
    showModal({
      content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
      title: "Erro no servidor",
      type: "error",
    });
  };
  useEffect(() => {
    invalidateRequestListQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);
  const mutationFn = async (items: any) => {
    try {
      if (items?.length > 0) {
        return Promise.all(
          items?.map?.((item: any) => api.delete(`/request/delete?_id=${item._id}`))
        );
      }
      return null;
    } catch (error) {
      handleError();
    }
  };
  const deleteRequest = useMutation({
    mutationFn,
    onSuccess: () => {
      invalidateRequestListQuery();
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
    deleteRequest.mutateAsync([item] as any);
  };
  const requestList =
    pages
      ?.map?.((page: any) => page?.requests)
      ?.flat()
      ?.map?.((request) => {
        const title = `${request?.professionalName ?? "Profissional"} - ${request?.name ?? "Cliente"}`;
        const start = new Date(request?.initDate);
        const end = new Date(request?.endDate);
        return { ...request, title, start, end };
      }) ?? [];
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
    selectedDate,
    setSelectedDate,
    requestList,
  };
};
