"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useUi } from "@/app/providers";
import { useGetInfiniteRequests } from "@/entities/request/request.lib";
import { queryClientInstance } from "@/shared/api/queryClient";
import { endOfDay, startOfDay } from "date-fns";
import { useEffect, useState } from "react";

export const useRequestInfiniteList = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { showModal, loading } = useUi();
  const [selectedDate, setSelectedDate] = useState<any>(new Date());

  const all = useGetInfiniteRequests(
    {
      getNextPageParam: (lastPage: any) => lastPage.next,
      getPreviousPageParam: (firstPage: any) => firstPage.prev,
    } as any,
    {
      initDate: startOfDay(new Date(selectedDate)),
      endDate: endOfDay(new Date(selectedDate)),
    }
  );
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [
        "requestsInfinite",
        {
          initDate: startOfDay(new Date(selectedDate)),
          endDate: endOfDay(new Date(selectedDate)),
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);
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
    deleteRequest.mutateAsync([item] as any);
  };
  const deleteRequest = useMutation({
    mutationFn: async (requestsToDelete: any = []) => {
      try {
        if (requestsToDelete?.length > 0) {
          return Promise.all(
            requestsToDelete?.map?.((request: any) =>
              api.delete(`/request/delete?_id=${request._id}`)
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
      queryClientInstance.invalidateQueries([
        "requestsInfinite",
        data?.pages ?? 1,
      ] as any);
      queryClientInstance.refetchQueries(["requestsInfinite", data?.pages] as any);
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
  };
};
