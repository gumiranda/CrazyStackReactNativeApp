import { createContext, useContext, useState, ReactNode } from "react";
import { useGetOwnerByUserId } from "@/slices/appointments/entities/owner/owner.lib";
import { useUsersSelect } from "@/slices/general/features/user/userList.hook";

type EditRequestProviderProps = {
  children: ReactNode;
  client: any;
  user: any;
  item: any;
};

type EditRequestContextData = any;

const EditRequestContext = createContext({} as EditRequestContextData);

export function EditRequestProvider({
  children,
  client,
  user,
  item,
}: EditRequestProviderProps) {
  const [request, setRequest] = useState(item ?? {});
  const { data: owner } = useGetOwnerByUserId(user?._id) as any;
  const propsProfessional = useUsersSelect({
    ownerSelected: owner?._id,
    userDefaultSelected: item?.professionalId,
  });
  return (
    <EditRequestContext.Provider
      value={{ request, setRequest, user, owner, propsProfessional, client }}
    >
      {children}
    </EditRequestContext.Provider>
  );
}
export const useEditRequest = () => {
  return useContext(EditRequestContext);
};
