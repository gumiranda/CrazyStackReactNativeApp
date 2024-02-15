import { useUserInfiniteList } from "@/entities/user";
import { useInfiniteFullList } from "@/shared/libs/hooks";

export const useClientUserList = () => {
  const { isFetching, userList, fetchNextPage, hasNextPage } = useUserInfiniteList({
    defaultParams: { role: "client" },
  });
  useInfiniteFullList({ fetchNextPage, hasNextPage, isFetching });
  return { userList };
};
