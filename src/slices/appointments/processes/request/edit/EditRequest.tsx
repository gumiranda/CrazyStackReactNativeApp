import { useSteps } from "@/shared/ui/templates/Stepper/useSteps.hook";
import { EditRequestProvider, useEditRequest } from "./context/EditRequest.context";
import { Stepper } from "@/shared/ui";
import { EditStepServiceProfessional } from "./steps/EditStepServiceProfessional";
import { EditStepDate } from "./steps/EditStepDate";

export const EditRequest = ({ route: { params } }) => {
  return (
    <EditRequestProvider {...params}>
      <EditRequestForm />
    </EditRequestProvider>
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
          ownerSelectedUserId={owner?.editdById}
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
      <Stepper steps={steps} activeStep={activeStep} onStepPress={onStepPress} />
    </>
  );
};
