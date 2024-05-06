import React, { ReactNode, createContext, useState, useMemo, useContext } from "react";
type AuthProviderProps = {
  children: ReactNode;
};
const AuthContext = createContext({} as any);

export function AuthProvider({ children }: AuthProviderProps) {
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
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
