import { Stepper } from "@/shared/ui";
import { StepClient } from "./steps/StepClient";
import { StepServiceProfessional } from "./steps/StepServiceProfessional";
import { StepRequestProvider, useStepRequest } from "./context/StepRequest.context";
import { StepDate } from "./steps/StepDate";
// import { StepSuccess } from "./steps/StepSuccess";
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
  const { owners, clients } = useStepRequest();
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
          ownerSelected={owners?.[0]?._id}
          ownerSelectedUserId={owners?.[0]?.createdById}
        />
      ),
    },
    {
      title: "Data",
      description: "Selecione dia e horário",
      component: <StepDate nextStep={nextStep} currentOwner={owners?.owners?.[0]} />,
    },
    // {
    //   title: "Sucesso",
    //   description: "Pedido criado com sucesso",
    //   component: (
    //     <StepSuccess
    //     key={4}
    //       title={"Confirmar agendamento"}
    //       content="Verifique os dados e confirme o agendamento clicando no botão abaixo."
    //   />,
    // },
  ];
  return (
    <>
      <Stepper activeStep={activeStep} steps={steps} onStepPress={onStepPress} />
    </>
  );
};
