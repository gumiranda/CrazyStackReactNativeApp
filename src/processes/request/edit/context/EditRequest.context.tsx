/* eslint-disable indent */
/* eslint-disable react-hooks/rules-of-hooks */

import { createContext, useContext, ReactNode, useState } from "react";
import { useGetOwnerByUserId } from "@/entities/owner/owner.lib";
import { useUsersSelect } from "@/features/user/userList.hook";

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
  const [request, setRequest] = useState<any>(item ?? {});
  const { data: owner } = useGetOwnerByUserId(user?._id) as any;

  const propsProfessional = useUsersSelect({
    ownerSelected: owner?._id,
    userDefaultSelected: item?.professionalId,
  });
  return (
    <EditRequestContext.Provider
      value={{ client, request, setRequest, owner, propsProfessional }}
    >
      {children}
    </EditRequestContext.Provider>
  );
}

export const useEditRequest = () => {
  if (typeof window === "undefined") return null;

  return useContext(EditRequestContext);
};
