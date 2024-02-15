/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { createContext, useEffect, useContext, ReactNode, useState } from "react";
import { api } from "@/shared/api";
import { useUi } from "@/app/providers";

type StepRequestProviderProps = {
  children: ReactNode;
};
type StepRequestContextData = any;
const StepRequestContext = createContext({} as StepRequestContextData);

export function StepRequestProvider({ children }: StepRequestProviderProps) {
  const { showModal, setLoading } = useUi();
  const [request, setRequest] = useState<any>({});
  console.log({ request });
  return (
    <StepRequestContext.Provider value={{ request, setRequest }}>
      {children}
    </StepRequestContext.Provider>
  );
}

export const useStepRequest = () => {
  if (typeof window === "undefined") return null;

  return useContext(StepRequestContext);
};
