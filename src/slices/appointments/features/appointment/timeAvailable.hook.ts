import { useState, useEffect } from "react";
import { cloneDate } from "@/shared/libs/utils";
import { getTimeAvailables } from "../../entities/appointment";

type Params = {
  ownerId: string;
  serviceId: string;
  professionalId: string;
  date: string | null;
};

export const useTimeAvailable = (params: Params) => {
  const { date, ownerId, professionalId, serviceId } = params;
  const [timeAvailable, setTimeAvailable] = useState<any>(null);
  const [timeSelected, setTimeSelected] = useState<string | null>(null);
  useEffect(() => {
    if (
      date &&
      ownerId?.length > 0 &&
      professionalId?.length > 0 &&
      serviceId?.length > 0
    ) {
      fetchTimeAvailables(date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, ownerId, professionalId, serviceId]);
  const fetchTimeAvailables = async (date: any) => {
    try {
      const newDateArr = date?.split?.("/") ?? [1, 1, 2001];
      const clonedDate = cloneDate(
        new Date(newDateArr?.[2], newDateArr?.[1] - 1, newDateArr?.[0])
      );
      const data = await getTimeAvailables({ ...params, date: clonedDate });
      setTimeAvailable(data);
    } catch (error) {
      setTimeAvailable(null);
    }
  };
  const handleChangeTimeSelected = (event: any) => {
    setTimeSelected(event?.value);
  };
  return { timeAvailable, timeSelected, handleChangeTimeSelected };
};
