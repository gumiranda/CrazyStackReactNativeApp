/* eslint-disable indent */
/* eslint-disable react-hooks/rules-of-hooks */

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useAuth, useUi } from "@/app/providers";
import { useGetOwnerByUserId } from "@/entities/owner/owner.lib";
import { useClientUserList } from "@/features/user/useClientUserList.hook";
import { useUsersSelect } from "@/features/user/userList.hook";

type CreateRequestProviderProps = {
  children: ReactNode;
};
type CreateRequestContextData = any;
const CreateRequestContext = createContext({} as CreateRequestContextData);

export function CreateRequestProvider({ children }: CreateRequestProviderProps) {
  const [request, setRequest] = useState<any>({});
  const { user } = useAuth();
  const { userList, isFetching: isFetchingClientUser } = useClientUserList();
  const { data: owner } = useGetOwnerByUserId(user?._id) as any;
  const { setLoading } = useUi();
  const isFetching = isFetchingClientUser;
  useEffect(() => {
    setLoading(isFetching);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);
  const propsProfessional = useUsersSelect({
    ownerSelected: owner?._id,
    userDefaultSelected: null,
  });
  return (
    <CreateRequestContext.Provider
      value={{ request, setRequest, clients: userList, owner, propsProfessional }}
    >
      {children}
    </CreateRequestContext.Provider>
  );
}

export const useCreateRequest = () => {
  if (typeof window === "undefined") return null;

  return useContext(CreateRequestContext);
};
