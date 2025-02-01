import { useCallback, useEffect, useState } from "react";
import { getServices, ServiceProps } from "../../entities/service";
import { UserProps } from "@/slices/general/entities/user";
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
  const [services, setServices] = useState([]);
  const [serviceSelected, setServiceSelected] = useState(
    services?.find?.((service) => currentUser?.serviceIds?.includes?.(service?._id))
      ?._id ?? ""
  );
  const handleChangeServiceSelected = (value) => {
    setServiceSelected(value?._id);
  };
  const fetchServicesPaginated = useCallback(async () => {
    if (page > 0) {
      const params = {};
      if (ownerSelected) {
        Object.assign(params, { createdById: ownerSelected });
      }
      const data = await getServices(page, params);
      if (data?.totalCount > services?.length) {
        setServices((prev) => {
          const uniqueServices = [...prev, ...(data?.services ?? [])].filter(
            (service, index, self) =>
              self.findIndex((u) => u._id === service._id) === index
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
      const data = await getServices(page, { createdById: ownerSelected });
      if (data?.totalCount > services?.length) {
        setServices((prev) => {
          const uniqueServices = [...prev, ...(data?.services ?? [])].filter(
            (service, index, self) =>
              self.findIndex((u) => u._id === service._id) === index
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerSelected, page, services]);
  useEffect(() => {
    if (userSelected && users?.length > 0) {
      const user = users?.find?.((user) => user?._id === userSelected);
      setServiceSelected(
        services?.find?.((service) => user?.serviceIds?.includes(service._id))?._id ?? ""
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSelected]);
  useEffect(() => {
    if (serviceSelected === "loadMore") {
      setPage((prev) => prev + 1);
    }
  }, [serviceSelected]);
  useEffect(() => {
    fetchServicesPaginated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  return {
    serviceSelected,
    setServiceSelected,
    handleChangeServiceSelected,
    services,
  };
};
