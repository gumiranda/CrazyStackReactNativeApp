import { Stepper } from "@/shared/ui";
import { EditStepDate } from "./steps/EditStepDate";
import { useSteps } from "@/shared/ui/templates/Stepper/useSteps.hook";
import { EditRequestProvider, useEditRequest } from "./context/EditRequest.context";
import { EditStepServiceProfessional } from "./steps/EditStepServiceProfessional";

export const EditRequest = ({ route: { params } }) => {
  return (
    <>
      <EditRequestProvider {...params}>
        <EditRequestForm />
      </EditRequestProvider>
    </>
  );
};
export const EditRequestForm = () => {
  const { owner } = useEditRequest();
  const stepProps = useSteps();
  const { nextStep, activeStep, onStepPress } = stepProps;

  const steps = [
    {
      title: "Profissional e Serviço",
      description: "Selecione o prestador e o serviço",
      component: (
        <EditStepServiceProfessional
          nextStep={nextStep}
          ownerSelectedUserId={owner?.createdById}
        />
      ),
    },
    {
      title: "Data",
      description: "Selecione dia e horário",
      component: <EditStepDate currentOwner={owner} />,
    },
  ];
  return (
    <>
      <Stepper activeStep={activeStep} steps={steps} onStepPress={onStepPress} />
    </>
  );
};
