import { ServiceProfessionalSelect } from "@/features/request/select";
import { useEditRequest } from "../context/EditRequest.context";

export const EditStepServiceProfessional = ({ ownerSelectedUserId, nextStep }) => {
  const { setRequest, propsProfessional } = useEditRequest();

  const onSubmit = (payload) => {
    setRequest((prev) => ({ ...prev, ...payload }));
    nextStep();
  };

  return (
    <ServiceProfessionalSelect
      ownerSelectedUserId={ownerSelectedUserId}
      externalOnSubmit={onSubmit}
      propsProfessional={propsProfessional}
    />
  );
};
