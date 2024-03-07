import { ServiceProfessionalSelect } from "@/features/request/select";
import { useStepRequest } from "../context/StepRequest.context";

export const StepServiceProfessional = ({
  ownerSelected,
  ownerSelectedUserId,
  nextStep,
}) => {
  const { setRequest } = useStepRequest();

  const onSubmit = (payload) => {
    setRequest((prev) => ({ ...prev, ...payload }));
    nextStep();
  };

  return (
    <ServiceProfessionalSelect
      ownerSelected={ownerSelected}
      ownerSelectedUserId={ownerSelectedUserId}
      externalOnSubmit={onSubmit}
    />
  );
};
