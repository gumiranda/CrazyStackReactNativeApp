import { SelectDate } from "@/slices/appointments/features/request/select";
import { useCreateRequest } from "../context/CreateRequest.context";

export const StepDate = ({ currentOwner }) => {
  const { request } = useCreateRequest();
  const handleCreateRequest = ({ requestToSend, currentService }) => {};
  return (
    <SelectDate
      currentOwner={currentOwner}
      externalOnSubmit={handleCreateRequest}
      request={request}
      buttonTitle="CONFIRMAR"
    />
  );
};
