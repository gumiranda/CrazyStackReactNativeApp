/* eslint-disable react-hooks/rules-of-hooks */

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useClientUserList } from "@/processes/full-create-request/hooks";
import { useAuth, useUi } from "@/app/providers";
import { useGetOwnerByUserId } from "@/entities/owner/owner.lib";

type StepRequestProviderProps = {
  children: ReactNode;
};
type StepRequestContextData = any;
const StepRequestContext = createContext({} as StepRequestContextData);

export function StepRequestProvider({ children }: StepRequestProviderProps) {
  const [request, setRequest] = useState<any>({});
  const { user } = useAuth();
  const { userList, isFetching: isFetchingClientUser } = useClientUserList();
  const { data: owner } = useGetOwnerByUserId(user?._id);
  const { setLoading } = useUi();
  const isFetching = isFetchingClientUser;
  useEffect(() => {
    setLoading(isFetching);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);
  return (
    <StepRequestContext.Provider
      value={{ request, setRequest, clients: userList, owner }}
    >
      {children}
    </StepRequestContext.Provider>
  );
}

export const useStepRequest = () => {
  if (typeof window === "undefined") return null;

  return useContext(StepRequestContext);
};
