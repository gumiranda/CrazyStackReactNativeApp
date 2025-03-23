import { api } from "@/shared/api";
import { PlaceProps, placeModel } from "./place.model";
export type GetPlacesResponse = {
  places: PlaceProps[];
  totalCount: number;
  next?: number;
  prev?: number;
};
const registerByPage = 10;
export const getPlaces = async (
  page: number,
  params: any = {}
): Promise<GetPlacesResponse> => {
  const { data } = await api.get("/place/loadByPage", {
    params: { page, sortBy: "createdAt", typeSort: "desc", ...params },
  });
  const { places = [], total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / registerByPage)
    ? totalCount / registerByPage
    : Math.floor(totalCount / registerByPage) + 1;
  const response = {
    places: places?.map?.((props: PlaceProps) => placeModel(props).format()),
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
export const getInfinitePlaces = async (
  { pageParam = 1 }: any,
  params: any
): Promise<GetPlacesResponse> => {
  return getPlaces(pageParam, params);
};
export const getPlaceById = async (id: string): Promise<PlaceProps | null> => {
  try {
    const { data } = await api.get("/place/load", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return placeModel(data).format();
  } catch (error) {
    return null;
  }
};
export const deletePlaceById = async (id: string): Promise<PlaceProps | null> => {
  try {
    const { data } = await api.delete("/place/delete", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return placeModel(data).format();
  } catch (error) {
    return null;
  }
};
