import { useEditRequest } from "../context/EditRequest.context";
import { ServiceProfessionalSelect } from "@/slices/appointments/features/request/select/service-professional";

export const EditStepServiceProfessional = ({ ownerSelectedUserId, nextStep }) => {
  const { setRequest, propsProfessional } = useEditRequest();

  const onSubmit = (payload) => {
    setRequest((prev) => ({ ...prev, ...payload }));
    nextStep();
  };
  return (
    <ServiceProfessionalSelect
      propsProfessional={propsProfessional}
      ownerSelectedUserId={ownerSelectedUserId}
      externalOnSubmit={onSubmit}
    />
  );
};
