import { useInfiniteFullList } from "@/shared/libs/hooks/useInfiniteFullList.hook";
import { useUserInfiniteList } from "../../entities/user/userInfiniteList.hook";

export const useClientUserList = () => {
  const { isFetching, userList, fetchNextPage, hasNextPage } = useUserInfiniteList({
    defaultParams: { role: "client" },
  });
  useInfiniteFullList({ fetchNextPage, hasNextPage, isFetching });
  return { isFetching, userList };
};
