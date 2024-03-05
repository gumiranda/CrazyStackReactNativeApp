import { useGetOwnerByUserId } from "@/entities/owner/owner.lib";
import { useServiceInfiniteList } from "@/entities/service";
import { useInfiniteFullList } from "@/shared/libs/hooks";

export const useListService = ({ user }) => {
  const { data: owner } = useGetOwnerByUserId(user?._id) as any;

  const { serviceListCount, serviceList, fetchNextPage, hasNextPage } =
    useServiceInfiniteList({
      defaultParams: {
        createdById: owner?.createdById as string,
      },
    });
  useInfiniteFullList({ fetchNextPage, hasNextPage });
  return { owner, serviceListCount, serviceList };
};
