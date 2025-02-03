import { api } from "@/shared/api";
import { CategoryPlaceProps, categoryplaceModel } from "./categoryPlace.model";
export type GetCategoryPlacesResponse = {
  categoryplaces: CategoryPlaceProps[];
  totalCount: number;
  next?: number;
  prev?: number;
};
const registerByPage = 10;
export const getCategoryPlaces = async (
  page: number,
  params: any = {}
): Promise<GetCategoryPlacesResponse> => {
  const { data } = await api.get("/categoryplace/loadByPage", {
    params: { page, sortBy: "createdAt", typeSort: "desc", ...params },
  });
  const { categoryplaces = [], total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / registerByPage)
    ? totalCount / registerByPage
    : Math.floor(totalCount / registerByPage) + 1;
  const response = {
    categoryplaces: categoryplaces?.map?.((props: CategoryPlaceProps) =>
      categoryplaceModel(props).format()
    ),
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
export const getInfiniteCategoryPlaces = async (
  { pageParam = 1 }: any,
  params: any
): Promise<GetCategoryPlacesResponse> => {
  return getCategoryPlaces(pageParam, params);
};
export const getCategoryPlaceById = async (
  id: string
): Promise<CategoryPlaceProps | null> => {
  try {
    const { data } = await api.get("/categoryplace/load", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return categoryplaceModel(data).format();
  } catch (error) {
    return null;
  }
};
export const deleteCategoryPlaceById = async (
  id: string
): Promise<CategoryPlaceProps | null> => {
  try {
    const { data } = await api.delete("/categoryplace/delete", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return categoryplaceModel(data).format();
  } catch (error) {
    return null;
  }
};
