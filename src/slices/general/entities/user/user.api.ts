import { api } from "@/shared/api";
import { UserProps, userModel } from "./user.model";
export type GetUsersResponse = {
  users: UserProps[];
  totalCount: number;
  next?: number;
  prev?: number;
};
const registerByPage = 10;
export const getUsers = async (
  page: number,
  params: any = {}
): Promise<GetUsersResponse> => {
  const { data } = await api.get("/user/loadByPage", {
    params: { page, sortBy: "createdAt", typeSort: "desc", ...params },
  });
  const { users = [], total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / registerByPage)
    ? totalCount / registerByPage
    : Math.floor(totalCount / registerByPage) + 1;
  const response = {
    users: users?.map?.((props: UserProps) => userModel(props).format()),
    totalCount,
  };
  if (lastPage > page) {
    Object.assign(response, { next: page + 1 });
  }
  if (page > 1) {
    Object.assign(response, { prev: page - 1 });
  }
  return response;
};
export const getInfiniteUsers = async (
  { pageParam = 1 }: any,
  params: any
): Promise<GetUsersResponse> => {
  return getUsers(pageParam, params);
};
export const getUserById = async (id: string): Promise<UserProps | null> => {
  try {
    const { data } = await api.get("/user/load", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return userModel(data).format();
  } catch (error) {
    return null;
  }
};
export const deleteUserById = async (id: string): Promise<UserProps | null> => {
  try {
    const { data } = await api.delete("/user/delete", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return userModel(data).format();
  } catch (error) {
    return null;
  }
};
