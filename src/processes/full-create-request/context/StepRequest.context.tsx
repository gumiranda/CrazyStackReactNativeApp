/* eslint-disable react-hooks/rules-of-hooks */

import { createContext, useContext, ReactNode, useState } from "react";
import { useClientUserList, useOwnerList } from "@/processes/full-create-request/hooks";

type StepRequestProviderProps = {
  children: ReactNode;
};
type StepRequestContextData = any;
const StepRequestContext = createContext({} as StepRequestContextData);

export function StepRequestProvider({ children }: StepRequestProviderProps) {
  const [request, setRequest] = useState<any>({});
  const { userList } = useClientUserList();
  const { ownerList } = useOwnerList();
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
