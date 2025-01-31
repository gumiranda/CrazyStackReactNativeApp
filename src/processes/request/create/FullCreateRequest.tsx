import { Stepper } from "@/shared/ui";
import { StepClient } from "./steps/StepClient";
import { StepServiceProfessional } from "./steps/StepServiceProfessional";
import { StepDate } from "./steps/StepDate";
import { useSteps } from "@/shared/ui/templates/Stepper/useSteps.hook";
import { CreateRequestProvider, useCreateRequest } from "./context/CreateRequest.context";

export const FullCreateRequest = () => {
  return (
    <>
      <CreateRequestProvider>
        <FullCreateRequestForm />
      </CreateRequestProvider>
    </>
  );
};
export const FullCreateRequestForm = () => {
  const { owner, clients } = useCreateRequest();
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
