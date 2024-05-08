import { useCallback, useEffect, useState } from "react";
import { getServices } from "../../entities/service";

export const useServicesSelect = ({
  serviceList = null,
  ownerSelected = null,
  role = "professional",
  serviceDefaultSelected = null,
  userSelected,
  users,
}) => {
  const [page, setPage] = useState(1);
  const [services, setServices] = useState(serviceList?.services ?? []);
  const [serviceSelected, setServiceSelected] = useState(
    serviceDefaultSelected ?? serviceList?.services[0]?._id
  );
  const handleChangeServiceSelected = (value) => {
    setServiceSelected(value?._id);
  };
  const fetchServicesPaginated = useCallback(async () => {
    if (serviceList?.totalCount > services.length && page > 1) {
      const params = { role };
      if (ownerSelected) {
        Object.assign(params, { ownerId: ownerSelected });
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
      setServiceSelected(data?.services?.[0]?._id ?? services?.[0]?._id ?? "");
    } else if (!serviceList && ownerSelected) {
      const data = await getServices(page, { role, ownerId: ownerSelected });
      if (data?.totalCount > services?.length) {
        setServices((prev) => {
          const uniqueServices = [...prev, ...(data?.services ?? [])].filter(
            (service, index, self) =>
              self.findIndex((u) => u._id === service._id) === index
          );
          return uniqueServices;
        });
      }
      setServiceSelected(data?.services?.[0]?._id ?? services?.[0]?._id ?? "");
    } else {
      setServiceSelected(services?.[0]?._id ?? "");
    }
  }, [ownerSelected, page, role, serviceList, services]);
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
  }, [fetchServicesPaginated, page]);
  return {
    serviceSelected,
    setServiceSelected,
    handleChangeServiceSelected,
    services,
  };
};
