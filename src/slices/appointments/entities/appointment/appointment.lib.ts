import { getAppointments, getInfiniteAppointments } from "./appointment.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetAppointments = (page: number, options?: UseQueryOptions): any => {
  return useQuery({
    queryKey: ["appointments", page],
    queryFn: () => getAppointments(page),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteAppointments = (
  options: Omit<UseInfiniteQueryOptions, "queryKey">,
  params?: any
) => {
  return useInfiniteQuery({
    queryKey: ["appointmentsInfinite", params],
    queryFn: ({ pageParam = 1, queryKey }: any) => {
      return getInfiniteAppointments(pageParam, queryKey?.[1]);
    },
    ...options,
  });
};
