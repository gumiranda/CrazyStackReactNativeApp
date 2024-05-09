import { SelectDate } from "@/slices/appointments/features/request/select";
import { useEditRequest } from "../context/EditRequest.context";
import { useNavigation } from "@react-navigation/native";
import { createRequestMutation } from "@/slices/appointments/features/request/create/createRequest.hook";
import { useEffect } from "react";

export const StepDate = ({ currentOwner }) => {
  const navigation = useNavigation();
  const { request, setRequest } = useEditRequest();
  const createRequest = createRequestMutation(() => {}, null);
  const handleCreateRequest = async ({ requestToSend, currentService }) => {
    setRequest((prev) => ({ ...prev, requestToSend, currentService }));
    await createRequest.mutateAsync(requestToSend);
  };
  const confirmRequest = (createRequest) => {
    navigation.navigate("ConfirmRequestOwner", {
      request: { ...request, requestCreated: createRequest, newStatus: 1 },
    });
  };
  useEffect(() => {
    if (createRequest?.data) {
      setRequest((prev) => ({ ...prev, requestCreated: createRequest?.data }));
      confirmRequest(createRequest?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createRequest?.data]);
  return (
    <SelectDate
      currentOwner={currentOwner}
      externalOnSubmit={handleCreateRequest}
      request={request}
      buttonTitle="CONFIRMAR"
    />
  );
};
