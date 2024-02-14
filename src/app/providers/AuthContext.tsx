import {
  getItemFromAsyncStorage,
  setItemInAsyncStorage,
} from "@/shared/libs/functions/storage";
import React, {
  ReactNode,
  createContext,
  useState,
  useMemo,
  useContext,
  useLayoutEffect,
} from "react";

type AuthProviderProps = {
  children: ReactNode;
};
const AuthContext = createContext({} as any);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null);
  const [verifyIsAuthenticated, setVerifyIsAuthenticated] = useState(false);
  const logout = async () => {
    setUser(null);
    await Promise.all([
      setItemInAsyncStorage("user", null),
      setItemInAsyncStorage("authorization", null),
      setItemInAsyncStorage("refreshtoken", null),
    ]);
    setVerifyIsAuthenticated(false);
  };

  useLayoutEffect(() => {
    async function init() {
      const currentUser = await getItemFromAsyncStorage("user");
      if (currentUser) {
        setUser(currentUser);
      }
      setVerifyIsAuthenticated(true);
    }
    if (!user && !verifyIsAuthenticated) {
      init();
    }
  }, [user, verifyIsAuthenticated]);
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      logout,
      verifyIsAuthenticated,
    }),
    [user, verifyIsAuthenticated]
  );
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
