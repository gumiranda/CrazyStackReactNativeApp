import { ServiceProfessionalSelect } from "@/features/request/select";
import { useCreateRequest } from "../context/CreateRequest.context";

export const StepServiceProfessional = ({ ownerSelectedUserId, nextStep }) => {
  const { setRequest, propsProfessional } = useCreateRequest();

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
