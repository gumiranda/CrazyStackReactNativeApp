import { useUi } from "@/app/providers";
import { useEffect } from "react";

export const useInfiniteFullList = ({ fetchNextPage, hasNextPage, isFetching }) => {
  const { setLoading } = useUi();

  useEffect(() => {
    fetchNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage]);
  useEffect(() => {
    setLoading(isFetching);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);
};
