import { toDate as toDateFns } from "date-fns";

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    weekday: "long",
  });
};
export const cloneDate = (date: number | Date): Date => {
  return toDateFns(new Date(date));
};
