/* eslint-disable react-hooks/rules-of-hooks */

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useClientUserList, useOwnerList } from "@/processes/full-create-request/hooks";
import { useUi } from "@/app/providers";

type StepRequestProviderProps = {
  children: ReactNode;
};
type StepRequestContextData = any;
const StepRequestContext = createContext({} as StepRequestContextData);

export function StepRequestProvider({ children }: StepRequestProviderProps) {
  const [request, setRequest] = useState<any>({});
  const { userList, isFetching: isFetchingClientUser } = useClientUserList();
  const { ownerList, isFetching: isFetchingOwner } = useOwnerList();
  const { setLoading } = useUi();
  const isFetching = isFetchingClientUser || isFetchingOwner;
  useEffect(() => {
    setLoading(isFetching);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);
  return (
    <StepRequestContext.Provider
      value={{ request, setRequest, clients: userList, owners: ownerList }}
    >
      {children}
    </StepRequestContext.Provider>
  );
}

export const useStepRequest = () => {
  if (typeof window === "undefined") return null;

  return useContext(StepRequestContext);
};
