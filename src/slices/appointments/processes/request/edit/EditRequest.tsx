import { useSteps } from "@/shared/ui/templates/Stepper/useSteps.hook";
import { EditRequestProvider, useEditRequest } from "./context/EditRequest.context";
import { StepClient } from "./steps/StepClient";
import { Stepper } from "@/shared/ui";
import { StepServiceProfessional } from "./steps/StepServiceProfessional";
import { StepDate } from "./steps/StepDate";

export const EditRequest = () => {
  return (
    <EditRequestProvider>
      <EditRequestForm />
    </EditRequestProvider>
  );
};
export const EditRequestForm = () => {
  const { owner, clients } = useEditRequest();
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
          ownerSelectedUserId={owner?.editdById}
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
      <Stepper steps={steps} activeStep={activeStep} onStepPress={onStepPress} />
    </>
  );
};
