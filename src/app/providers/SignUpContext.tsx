import React, { ReactNode, createContext, useState, useMemo, useContext } from "react";
type SignUpProviderProps = {
  children: ReactNode;
};
const SignUpContext = createContext({} as any);

export function SignUpProvider({ children }: SignUpProviderProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const contextValue = useMemo(
    () => ({
      setEmail,
      email,
      name,
      setName,
      phone,
      setPhone,
    }),
    [name, email, phone]
  );
  return <SignUpContext.Provider value={contextValue}>{children}</SignUpContext.Provider>;
}
export const useSignUp = () => useContext(SignUpContext);
