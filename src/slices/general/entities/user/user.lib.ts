import { getUsers, getInfiniteUsers } from "./user.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetUsers = (page: number, options?: UseQueryOptions): any => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(page),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteUsers = (
  options: Omit<UseInfiniteQueryOptions, "queryKey">,
  params?: any
) => {
  return useInfiniteQuery({
    queryKey: ["usersInfinite", params],
    queryFn: ({ pageParam = 1, queryKey }: any) => {
      return getInfiniteUsers(pageParam, queryKey?.[1]);
    },
    ...options,
  });
};
