import { useEffect } from "react";
import { useCreateRequest } from "../context/CreateRequest.context";
import { createRequestMutation } from "@/features/request/create/createRequest.hook";
import { useNavigation } from "@react-navigation/native";
import { SelectDate } from "@/features/request/select";

export const StepDate = ({ currentOwner }) => {
  const navigation = useNavigation();
  const { request, setRequest } = useCreateRequest() || {};

  const createRequest = createRequestMutation(() => {}, null);

  const handleCreateRequest = async ({ requestToSend, currentService }) => {
    setRequest((prev) => ({
      ...prev,
      requestToSend,
      currentService,
    }));

    await createRequest.mutateAsync(requestToSend);
  };
  const confirmRequest = (createRequest) => {
    navigation.navigate("ConfirmRequestOwner", {
      request: { ...request, requestCreated: createRequest },
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
      buttonTitle={"CONFIRMAR"}
    />
  );
};
