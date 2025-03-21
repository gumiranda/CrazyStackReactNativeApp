import {
  getCategoryPlaceById,
  getCategoryPlaces,
  getInfiniteCategoryPlaces,
} from "./categoryPlace";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetCategoryPlaces = (page: number, options?: UseQueryOptions): any => {
  return useQuery({
    queryKey: ["categoryplaces", page],
    queryFn: () => getCategoryPlaces(page),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteCategoryPlaces = (
  options: Omit<UseInfiniteQueryOptions, "queryKey">,
  params?: any
) => {
  return useInfiniteQuery({
    queryKey: ["categoryplacesInfinite", params],
    queryFn: ({ pageParam = 1, queryKey }: any) => {
      return getInfiniteCategoryPlaces(pageParam, queryKey?.[1]);
    },
    ...options,
  });
};
export const useGetCategoryPlaceById = (id: string, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ["categoryplace", id],
    queryFn: () => getCategoryPlaceById(id),
    ...options,
  });
};
