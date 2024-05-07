import { getClients, getInfiniteClients } from "./client.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetClients = (page: number, options?: UseQueryOptions): any => {
  return useQuery({
    queryKey: ["clients", page],
    queryFn: () => getClients(page),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteClients = (
  options: Omit<UseInfiniteQueryOptions, "queryKey">,
  params?: any
) => {
  return useInfiniteQuery({
    queryKey: ["clientsInfinite", params],
    queryFn: ({ pageParam = 1, queryKey }: any) => {
      return getInfiniteClients(pageParam, queryKey?.[1]);
    },
    ...options,
  });
};
