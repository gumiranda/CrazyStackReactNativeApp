import { Stepper } from "@/shared/ui";
import { StepClient } from "./steps/StepClient";
import { StepServiceProfessional } from "./steps/StepServiceProfessional";
import { StepRequestProvider, useStepRequest } from "./context/StepRequest.context";
import { StepDate } from "./steps/StepDate";
import { useSteps } from "@/shared/ui/templates/Stepper/useSteps.hook";

export const FullCreateRequest = () => {
  return (
    <>
      <StepRequestProvider>
        <FullCreateRequestForm />
      </StepRequestProvider>
    </>
  );
};
export const FullCreateRequestForm = () => {
  const { owner, clients } = useStepRequest();
  const stepProps = useSteps();
  const { nextStep, activeStep, onStepPress } = stepProps;

  const steps = [
    {
      title: "Cliente",
      description: "Nome e telefone",
      component: <StepClient userList={clients} nextStep={nextStep} />,
    },
    {
      title: "Profissional e Serviço",
      description: "Selecione o prestador e o serviço",
      component: (
        <StepServiceProfessional
          nextStep={nextStep}
          ownerSelected={owner?._id}
          ownerSelectedUserId={owner?.createdById}
        />
      ),
    },
    {
      title: "Data",
      description: "Selecione dia e horário",
      component: <StepDate currentOwner={owner} />,
    },
  ];
  return (
    <>
      <Stepper activeStep={activeStep} steps={steps} onStepPress={onStepPress} />
    </>
  );
};
