import { getPlaceById, getPlaces, getInfinitePlaces } from "./place.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetPlaces = (page: number, options?: UseQueryOptions): any => {
  return useQuery({
    queryKey: ["places", page],
    queryFn: () => getPlaces(page),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfinitePlaces = (
  options: Omit<UseInfiniteQueryOptions, "queryKey">,
  params?: any
) => {
  return useInfiniteQuery({
    queryKey: ["placesInfinite", params],
    queryFn: ({ pageParam = 1, queryKey }: any) => {
      return getInfinitePlaces(pageParam, queryKey?.[1]);
    },
    ...options,
  });
};
export const useGetPlaceById = (id: string, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ["place", id],
    queryFn: () => getPlaceById(id),
    ...options,
  });
};
