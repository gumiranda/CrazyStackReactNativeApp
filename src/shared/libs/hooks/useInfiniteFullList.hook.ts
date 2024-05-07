import { useAuth } from "@/app/providers";
import { useEffect } from "react";

export const useInfiniteFullList = ({ fetchNextPage, hasNextPage, isFetching }) => {
  const { user } = useAuth();
  useEffect(() => {
    if (user?.role === "owner" && hasNextPage === true && !isFetching) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, hasNextPage, isFetching]);
};
