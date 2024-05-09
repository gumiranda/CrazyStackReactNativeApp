import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth, useUi } from "@/app/providers";
import { useClientUserList } from "@/slices/general/features/user/useClientUserList.hook";
import { useGetOwnerByUserId } from "@/slices/appointments/entities/owner/owner.lib";
import { useUsersSelect } from "@/slices/general/features/user/userList.hook";

type EditRequestProviderProps = {
  children: ReactNode;
};

type EditRequestContextData = any;

const EditRequestContext = createContext({} as EditRequestContextData);

export function EditRequestProvider({ children }: EditRequestProviderProps) {
  const [request, setRequest] = useState({});
  const { setLoading } = useUi();
  const { user } = useAuth();
  const { isFetching: isFetchingClientUser, userList } = useClientUserList();
  const { data: owner } = useGetOwnerByUserId(user?._id) as any;
  const propsProfessional = useUsersSelect({
    ownerSelected: owner?._id,
    userDefaultSelected: null,
  });
  useEffect(() => {
    setLoading(isFetchingClientUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingClientUser]);
  return (
    <EditRequestContext.Provider
      value={{ request, setRequest, user, owner, propsProfessional, clients: userList }}
    >
      {children}
    </EditRequestContext.Provider>
  );
}
export const useEditRequest = () => {
  return useContext(EditRequestContext);
};
