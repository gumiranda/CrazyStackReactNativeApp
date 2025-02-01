import { getOwners, getInfiniteOwners, getOwnerByUserId } from "./owner.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetOwners = (page: number, options?: UseQueryOptions): any => {
  return useQuery({
    queryKey: ["owners", page],
    queryFn: () => getOwners(page),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteOwners = (
  options: Omit<UseInfiniteQueryOptions, "queryKey">,
  params?: any
) => {
  return useInfiniteQuery({
    queryKey: ["ownersInfinite", params],
    queryFn: ({ pageParam = 1, queryKey }: any) => {
      return getInfiniteOwners(pageParam, queryKey?.[1]);
    },
    ...options,
  });
};
export const useGetOwnerByUserId = (id: string, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ["owner", id],
    queryFn: () => getOwnerByUserId(id),
    ...options,
  });
};
