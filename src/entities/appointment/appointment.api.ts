import { api } from "@/shared/api";
import { AppointmentProps, appointmentModel } from "./appointment.model";
export type GetAppointmentsResponse = {
  appointments: AppointmentProps[];
  totalCount: number;
  next?: number;
  prev?: number;
};
const registerByPage = 10;
export const getAppointments = async (
  page: number,
  params: any = {}
): Promise<GetAppointmentsResponse> => {
  const { data } = await api.get("/appointment/loadByPage", {
    params: { page, sortBy: "createdAt", typeSort: "desc", ...params },
  });
  const { appointments, total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / registerByPage)
    ? totalCount / registerByPage
    : Math.floor(totalCount / registerByPage) + 1;
  const response = {
    appointments: appointments?.map?.((props: AppointmentProps) =>
      appointmentModel(props).format()
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
export const getInfiniteAppointments = async (
  { pageParam = 1 }: any,
  params: any
): Promise<GetAppointmentsResponse> => {
  return getAppointments(pageParam, params);
};
export const getAppointmentById = async (
  id: string
): Promise<AppointmentProps | null> => {
  try {
    const { data } = await api.get("/appointment/load", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return appointmentModel(data).format();
  } catch (error) {
    return null;
  }
};
