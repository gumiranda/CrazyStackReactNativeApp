import { useGetClientById } from "@/entities/client/client.lib";
import { useGetServiceById } from "@/entities/service/service.lib";

export const useRequestDetailsOwner = ({ serviceId, clientId }) => {
  const { data: service } = useGetServiceById(serviceId);
  const { data: client } = useGetClientById(clientId);
  return { service, client };
};
