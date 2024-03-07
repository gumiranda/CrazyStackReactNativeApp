import { useUi } from "@/app/providers";
import { useGetOwnerByUserId } from "@/entities/owner/owner.lib";
import { useServiceInfiniteList } from "@/entities/service";
import { useInfiniteFullList } from "@/shared/libs/hooks";
import { useEffect } from "react";

export const useListService = ({ user }) => {
  const { setLoading } = useUi();
  const { data: owner, isFetching: isFetchingOwner } = useGetOwnerByUserId(
    user?._id
  ) as any;

  const {
    isFetching: isFetchingService,
    serviceListCount,
    serviceList,
    fetchNextPage,
    hasNextPage,
  } = useServiceInfiniteList({
    defaultParams: {
      createdById: owner?.createdById as string,
    },
  });
  useInfiniteFullList({ fetchNextPage, hasNextPage });
  const isFetching = isFetchingService || isFetchingOwner;
  useEffect(() => {
    setLoading(isFetching);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);
  return { owner, serviceListCount, serviceList, isFetching };
};
