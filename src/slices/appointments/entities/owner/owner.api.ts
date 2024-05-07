import { api } from "@/shared/api";
import { OwnerProps, ownerModel } from "./owner.model";
export type GetOwnersResponse = {
  owners: OwnerProps[];
  totalCount: number;
  next?: number;
  prev?: number;
};
const registerByPage = 10;
export const getOwners = async (
  page: number,
  params: any = {}
): Promise<GetOwnersResponse> => {
  const { data } = await api.get("/owner/loadByPage", {
    params: { page, sortBy: "createdAt", typeSort: "desc", ...params },
  });
  const { owners = [], total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / registerByPage)
    ? totalCount / registerByPage
    : Math.floor(totalCount / registerByPage) + 1;
  const response = {
    owners: owners?.map?.((props: OwnerProps) => ownerModel(props).format()),
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
export const getInfiniteOwners = async (
  { pageParam = 1 }: any,
  params: any
): Promise<GetOwnersResponse> => {
  return getOwners(pageParam, params);
};
export const getOwnerById = async (id: string): Promise<OwnerProps | null> => {
  try {
    const { data } = await api.get("/owner/load", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return ownerModel(data).format();
  } catch (error) {
    return null;
  }
};
export const deleteOwnerById = async (id: string): Promise<OwnerProps | null> => {
  try {
    const { data } = await api.delete("/owner/delete", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return ownerModel(data).format();
  } catch (error) {
    return null;
  }
};
