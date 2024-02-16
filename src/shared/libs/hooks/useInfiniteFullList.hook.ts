import { useEffect } from "react";

export const useInfiniteFullList = ({ fetchNextPage, hasNextPage }) => {
  useEffect(() => {
    fetchNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage]);
};
