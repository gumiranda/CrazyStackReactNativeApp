import { useState, useEffect, useCallback } from "react";
import { getServices } from "./service.api";
import { UserProps } from "../user";
import { ServiceProps } from "./service.model";
export type UserFormProps = {
  currentUser?: UserProps;
  currentService?: ServiceProps;
  ownerSelected?: string | null;
  userSelected?: string | null;
  users?: UserProps[];
};

export const useServicesSelect = ({
  currentUser,
  userSelected = null,
  ownerSelected = null,
  users = [],
}: UserFormProps) => {
  const [page, setPage] = useState(1);
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [serviceSelected, setServiceSelected] = useState(
    services?.find?.((service) => currentUser?.serviceIds?.includes?.(service?._id))
      ?._id ?? ""
  );
  const handleChangeServiceSelected = (option: any) => {
    setServiceSelected(option?._id);
  };
  useEffect(() => {
    if (userSelected && users?.length > 0) {
      const user = users?.find?.((user) => user?._id === userSelected);
      setServiceSelected(
        services?.find?.((service) => user?.serviceIds?.includes(service._id))?._id ?? ""
      );
    }
  }, [userSelected]);
  const fetchServicesPaginated = useCallback(async () => {
    if (page > 0) {
      const params = {};
      if (ownerSelected) {
        Object.assign(params, { createdById: ownerSelected });
      }
      const data = await getServices(page, params);
      if (data?.totalCount > services?.length) {
        setServices((prev) => {
          // Filter out duplicates based on _id
          const uniqueServices = [...prev, ...(data?.services ?? [])].filter(
            (service, index, self) =>
              self.findIndex((s) => s._id === service._id) === index
          );
          return uniqueServices;
        });
      }
      setServiceSelected(
        data?.services?.[0]?._id ??
          services?.find?.((service) => currentUser?.serviceIds?.includes?.(service?._id))
            ?._id ??
          services?.[0]?._id ??
          ""
      );
    } else if (ownerSelected) {
      const data = await getServices(page, {
        createdById: ownerSelected,
      });
      if (data?.totalCount > services?.length) {
        setServices((prev) => {
          // Filter out duplicates based on _id
          const uniqueServices = [...prev, ...(data?.services ?? [])].filter(
            (service, index, self) =>
              self.findIndex((s) => s._id === service._id) === index
          );
          return uniqueServices;
        });
      }
      setServiceSelected(
        data?.services?.[0]?._id ??
          services?.find?.((service) => currentUser?.serviceIds?.includes?.(service?._id))
            ?._id ??
          services?.[0]?._id ??
          ""
      );
    } else {
      setServiceSelected(
        services?.find?.((service) => currentUser?.serviceIds?.includes?.(service._id))
          ?._id ??
          services?.[0]?._id ??
          ""
      );
    }
  }, [currentUser?.serviceIds, ownerSelected, page, services]);

  useEffect(() => {
    if (serviceSelected === "loadMore") {
      setPage((prev) => prev + 1);
    }
  }, [serviceSelected]);
  useEffect(() => {
    fetchServicesPaginated();
  }, [page]);
  return {
    serviceSelected,
    setServiceSelected,
    handleChangeServiceSelected,
    services,
  };
};
