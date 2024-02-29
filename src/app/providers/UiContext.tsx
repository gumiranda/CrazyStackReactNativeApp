import React, { ReactNode, createContext, useState, useMemo, useContext } from "react";
import { Dialog, Loading } from "@/shared/ui";

type UiProviderProps = {
  children: ReactNode;
};
const UiContext = createContext({} as any);

export function UiProvider({ children }: UiProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dialog, setDialog] = useState(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const showModal = (props) => {
    setDialog(props);
    setIsOpen(true);
  };
  const contextValue = useMemo(
    () => ({
      loading,
      setLoading,
      setDialog,
      dialog,
      isOpen,
      setIsOpen,
      showModal,
    }),
    [loading, isOpen, dialog]
  );
  return (
    <UiContext.Provider value={contextValue}>
      {children}
      {loading && <Loading color="#fff" size={60} />}
      {isOpen && dialog && <Dialog {...dialog} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </UiContext.Provider>
  );
}
export const useUi = () => useContext(UiContext);
