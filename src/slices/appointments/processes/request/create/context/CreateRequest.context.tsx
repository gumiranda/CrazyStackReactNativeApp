import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth, useUi } from "@/app/providers";

type CreateRequestProviderProps = {
  children: ReactNode;
};

type CreateRequestContextData = any;

const CreateRequestContext = createContext({} as CreateRequestContextData);

export function CreateRequestProvider({ children }: CreateRequestProviderProps) {
  const [request, setRequest] = useState({});
  const { setLoading } = useUi();
  const { user } = useAuth();
  const isFetching = false;
  useEffect(() => {
    setLoading(isFetching);
  }, [isFetching]);
  return (
    <CreateRequestContext.Provider value={{ request, setRequest, user }}>
      {children}
    </CreateRequestContext.Provider>
  );
}
export const useCreateRequest = () => {
  return useContext(CreateRequestContext);
};
