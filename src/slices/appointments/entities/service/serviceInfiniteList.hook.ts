import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useUi } from "@/app/providers";
import { SERVER_ERROR_MESSAGE } from "@/shared/libs/utils/constants";
import { useEffect, useState } from "react";
import { useGetInfiniteServices } from "./service.lib";

export const useServiceInfiniteList = ({ defaultParams = {} }) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { showModal, loading } = useUi();
  const [params, setParams] = useState<any>(defaultParams);

  const all = useGetInfiniteServices(
    {
      getNextPageParam: (lastPage: any) => lastPage.next,
      getPreviousPageParam: (firstPage: any) => firstPage.prev,
    } as any,
    params
  );
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["servicesInfinite", params],
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
    deleteService.mutateAsync([item] as any);
  };
  const deleteService = useMutation({
    mutationFn: async (servicesToDelete: any = []) => {
      try {
        if (servicesToDelete?.length > 0) {
          return Promise.all(
            servicesToDelete?.map?.((service: any) =>
              api.delete("/service/delete", { params: { _id: service._id } })
            )
          );
        }
        return null;
      } catch (error) {
        showModal({
          content: SERVER_ERROR_MESSAGE,
          title: "Erro no servidor",
          type: "error",
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["servicesInfinite", params],
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "HomePage" }],
        })
      );
    },
    onError: () => {
      showModal({
        content: SERVER_ERROR_MESSAGE,
        title: "Erro no servidor",
        type: "error",
      });
    },
    retry: 3,
  } as any);
  const serviceList =
    data?.pages?.map?.((page: any) => page?.services)?.flat() ?? [];
  const serviceListCount =
    data?.pages?.map?.((page: any) => page?.totalCount)?.flat() ?? [];
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
    serviceList,
    serviceListCount,
  };
};
