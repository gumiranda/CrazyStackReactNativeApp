import { useSteps } from "@/shared/ui/templates/Stepper/useSteps.hook";
import { CreateRequestProvider, useCreateRequest } from "./context/CreateRequest.context";
import { StepClient } from "./steps/StepClient";
import { Stepper } from "@/shared/ui";
import { StepServiceProfessional } from "./steps/StepServiceProfessional";
import { StepDate } from "./steps/StepDate";

export const FullCreateRequest = () => {
  return (
    <CreateRequestProvider>
      <FullCreateRequestForm />
    </CreateRequestProvider>
  );
};
export const FullCreateRequestForm = () => {
  const { owner, clients } = useCreateRequest();
  const stepProps = useSteps();
  const { nextStep, activeStep, onStepPress } = stepProps;
  const steps = [
    { title: "Cliente", description: "Nome e telefone", component: <StepClient /> },
    {
      title: "Profissional e Serviço",
      description: "Selecione o prestador e o serviço",
      component: <StepServiceProfessional />,
    },
    { title: "Data", description: "Selecione dia e horário", component: <StepDate /> },
  ];
  return (
    <>
      <Stepper steps={steps} activeStep={activeStep} onStepPress={onStepPress} />
    </>
  );
};
