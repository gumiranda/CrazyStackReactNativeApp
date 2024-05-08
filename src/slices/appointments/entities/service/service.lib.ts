import { getServices, getInfiniteServices, getServiceById } from "./service.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetServices = (page: number, options?: UseQueryOptions): any => {
  return useQuery({
    queryKey: ["services", page],
    queryFn: () => getServices(page),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteServices = (
  options: Omit<UseInfiniteQueryOptions, "queryKey">,
  params?: any
) => {
  return useInfiniteQuery({
    queryKey: ["servicesInfinite", params],
    queryFn: ({ pageParam = 1, queryKey }: any) => {
      return getInfiniteServices(pageParam, queryKey?.[1]);
    },
    ...options,
  });
};
export const useGetServiceById = (id: string, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ["service", id],
    queryFn: () => getServiceById(id),
    ...options,
  });
};
