import { useGetOwnerByUserId } from "@/entities/owner/owner.lib";

export const useListService = ({ user }) => {
  const { data: owner } = useGetOwnerByUserId(user?._id);
  return { owner };
};
