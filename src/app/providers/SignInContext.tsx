import React, { ReactNode, createContext, useState, useMemo, useContext } from "react";
type SignInProviderProps = {
  children: ReactNode;
};
const SignInContext = createContext({} as any);

export function SignInProvider({ children }: SignInProviderProps) {
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
  return <SignInContext.Provider value={contextValue}>{children}</SignInContext.Provider>;
}
export const useSignIn = () => useContext(SignInContext);
