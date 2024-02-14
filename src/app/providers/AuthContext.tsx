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
  useEffect,
} from "react";

type AuthProviderProps = {
  children: ReactNode;
};
const AuthContext = createContext({} as any);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null);
  const logout = () => {
    setUser(null);
    setItemInAsyncStorage("user", null);
    setItemInAsyncStorage("authorization", null);
    setItemInAsyncStorage("refreshtoken", null);
  };

  useEffect(() => {
    async function init() {
      const currentUser = await getItemFromAsyncStorage("user");
      if (currentUser) {
        setUser(currentUser);
      }
    }
    if (!user) {
      init();
    }
  }, [user]);
  console.tron.log({ user });
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
