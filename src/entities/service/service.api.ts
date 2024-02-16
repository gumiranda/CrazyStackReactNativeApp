import { api } from "@/shared/api";
import { ServiceProps, serviceModel } from "./service.model";
export type GetServicesResponse = {
  services: ServiceProps[];
  totalCount: number;
  next?: number;
  prev?: number;
};
const registerByPage = 10;
export const getServices = async (
  page: number,
  params: any = {}
): Promise<GetServicesResponse> => {
  const { data } = await api.get("/service/loadByPage", {
    params: { page, sortBy: "createdAt", typeSort: "desc", ...params },
  });
  const { services = [], total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / registerByPage)
    ? totalCount / registerByPage
    : Math.floor(totalCount / registerByPage) + 1;
  const response = {
    services: services?.map?.((props: ServiceProps) => serviceModel(props).format()),
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
export const getInfiniteServices = async (
  { pageParam = 1 }: any,
  params: any
): Promise<GetServicesResponse> => {
  return getServices(pageParam, params);
};
export const getServiceById = async (id: string): Promise<ServiceProps | null> => {
  try {
    const { data } = await api.get("/service/load", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return serviceModel(data).format();
  } catch (error) {
    return null;
  }
};
export const deleteServiceById = async (id: string): Promise<ServiceProps | null> => {
  try {
    const { data } = await api.delete("/service/delete", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return serviceModel(data).format();
  } catch (error) {
    return null;
  }
};
