import { api } from "@/shared/api";
import { TimeAvailableProps, timeAvailableModel } from "./timeAvailable.model";

export const getTimeAvailables = async (
  params: any = {}
): Promise<TimeAvailableProps | null> => {
  const { data } = await api.get("/appointment/loadAvailableTimes", {
    params,
  });
  const { timeAvailable, timeAvailableProfessional } = data || {};
  if (!timeAvailable) {
    return null;
  }
  return timeAvailableModel({
    ...params,
    timeAvailable,
    timeAvailableProfessional,
  }).format();
};
