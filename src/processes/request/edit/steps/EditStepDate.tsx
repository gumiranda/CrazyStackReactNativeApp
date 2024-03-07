import { useEffect } from "react";
import { useEditRequest } from "../context/EditRequest.context";
import { useNavigation } from "@react-navigation/native";
import { SelectDate } from "@/features/request/select";
import { editRequestMutation } from "@/features/request/edit/editRequest.hook";
import { useUi } from "@/app/providers";
import { startOfDay } from "date-fns";

export const EditStepDate = ({ currentOwner }) => {
  const navigation = useNavigation();
  const { request, setRequest } = useEditRequest() || {};
  const { showModal } = useUi();

  const editRequest = editRequestMutation({
    currentRequest: request,
    showModal,
    routeRedirect: "HomePage",
    content: "Agendamento confirmado com sucesso, já pode ser visualizado na agenda.",
  });

  const handleEditRequest = async ({ requestToSend, currentService }) => {
    setRequest((prev) => ({
      ...prev,
      requestToSend,
      currentService,
    }));

    await editRequest.mutateAsync({
      ...requestToSend,
      date: startOfDay(requestToSend?.initDate),
      status: 5,
    } as any);
  };
  const confirmRequest = (payload) => {
    navigation.navigate("ConfirmRequestOwner", {
      request: { ...request, requestCreated: payload, newStatus: 7 },
    });
  };
  useEffect(() => {
    if (editRequest?.data) {
      setRequest((prev) => ({ ...prev, requestCreated: editRequest?.data }));
      confirmRequest(editRequest?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRequest?.data]);

  return (
    <SelectDate
      currentOwner={currentOwner}
      externalOnSubmit={handleEditRequest}
      request={request}
      buttonTitle={"CONFIRMAR"}
    />
  );
};
