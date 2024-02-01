import React, { ReactNode, createContext, useState, useMemo, useContext } from "react";

type AuthProviderProps = {
  children: ReactNode;
};
const AuthContext = createContext({} as any);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null);

  const signIn = ({ email, password }) => {};
  const contextValue = useMemo(
    () => ({
      signIn,
      user,
      setUser,
    }),
    [user]
  );
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
