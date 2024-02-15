import { useOwnerInfiniteList } from "@/entities/owner";
import { useInfiniteFullList } from "@/shared/libs/hooks";

export const useOwnerList = () => {
  const { isFetching, ownerList, fetchNextPage, hasNextPage } = useOwnerInfiniteList({
    defaultParams: {},
  });
  useInfiniteFullList({ fetchNextPage, hasNextPage, isFetching });
  return { ownerList };
};
