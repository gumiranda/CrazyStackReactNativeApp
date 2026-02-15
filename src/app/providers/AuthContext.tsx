import { saveToken } from "@/shared/api";
import { getItemFromAsyncStorage, setItemInAsyncStorage } from "@/shared/libs/functions";
import React, {
  ReactNode,
  createContext,
  useState,
  useMemo,
  useCallback,
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
  const logout = useCallback(async () => {
    await Promise.all([
      setItemInAsyncStorage("user", null),
      setItemInAsyncStorage("authorization", null),
      setItemInAsyncStorage("refreshtoken", null),
    ]);
    setUser(null);
    setVerifyIsAuthenticated(false);
  }, []);
  useLayoutEffect(() => {
    async function init() {
      const [currentUser, accessToken, refreshToken] = await Promise.all([
        getItemFromAsyncStorage("user"),
        getItemFromAsyncStorage("authorization"),
        getItemFromAsyncStorage("refreshtoken"),
      ]);
      if (currentUser) {
        setUser(currentUser);
      }
      saveToken({ token: accessToken, type: "authorization", persist: false });
      saveToken({ token: refreshToken, type: "refreshtoken", persist: false });
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
    [user, verifyIsAuthenticated, logout]
  );
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
