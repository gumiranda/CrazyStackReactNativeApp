import { useCreateRequest } from "../context/CreateRequest.context";
import { ServiceProfessionalSelect } from "@/slices/appointments/features/request/select/service-professional";

export const StepServiceProfessional = ({ ownerSelectedUserId, nextStep }) => {
  const { setRequest, propsProfessional } = useCreateRequest();

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
