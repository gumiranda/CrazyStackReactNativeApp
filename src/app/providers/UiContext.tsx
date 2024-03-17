import React, { ReactNode, createContext, useState, useMemo, useContext } from "react";
import { Dialog, Loading } from "@/shared/ui";

type UiProviderProps = {
  children: ReactNode;
};

const UiContext = createContext({} as any);

export function UiProvider({ children }: UiProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dialog, setDialog] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const contextValue = useMemo(
    () => ({ loading, setLoading, dialog, setDialog, isOpen, setIsOpen }),
    [loading, dialog, isOpen]
  );
  return (
    <UiContext.Provider value={contextValue}>
      {children}
      {loading && <Loading color="#fff" size={60} />}
      {isOpen && dialog && <Dialog {...dialog} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </UiContext.Provider>
  );
}

export const useUi = () => {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error("useUi must be used within a UiProvider");
  }
  return context;
};
