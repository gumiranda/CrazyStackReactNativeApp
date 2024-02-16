"use client";
import { useState, useEffect, useCallback } from "react";
import { GetServicesResponse, getServices } from "./service.api";
import { UserProps } from "../user";
import { ServiceProps } from "./service.model";
export type UserFormProps = {
  serviceList?: GetServicesResponse;
  currentUser?: UserProps;
  currentService?: ServiceProps;
  ownerSelected?: string | null;
  userSelected?: string | null;
  users?: UserProps[];
};

export const useServicesSelect = ({
  serviceList,
  currentUser,
  userSelected = null,
  ownerSelected = null,
  users = [],
}: UserFormProps) => {
  const [page, setPage] = useState(1);
  const [services, setServices] = useState<ServiceProps[]>(serviceList?.services ?? []);
  const [serviceSelected, setServiceSelected] = useState(
    services?.find?.((service) => currentUser?.serviceIds?.includes?.(service?._id))
      ?._id ??
      serviceList?.services?.[0]?._id ??
      ""
  );
  const handleChangeServiceSelected = (value: any) => {
    setServiceSelected(value);
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
    if (serviceList && serviceList?.totalCount > services?.length && page > 1) {
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
    } else if (!serviceList && ownerSelected) {
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
  }, [currentUser?.serviceIds, ownerSelected, page, serviceList, services]);

  useEffect(() => {
    setServices(serviceList?.services ?? []);
  }, [serviceList?.services]);
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
