"use client";
import { Stepper } from "@/shared/ui";
import { StepClient } from "./steps/StepClient";
import { StepServiceProfessional } from "./steps/StepServiceProfessional";
import { StepRequestProvider } from "./context/StepRequest.context";
import { StepDate } from "./steps/StepDate";
import { StepSuccess } from "./steps/StepSuccess";
import { useSteps } from "@/shared/ui/templates/Stepper/useSteps.hook";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useUi } from "@/app/providers";

export const FullCreateRequest = (props) => {
  return (
    <>
      <StepRequestProvider>
        <FullCreateRequestForm {...props} />
      </StepRequestProvider>
    </>
  );
};
export const FullCreateRequestForm = ({ clients, owners }) => {
  const navigation = useNavigation();
  const { setLoading } = useUi();
  const theme = useTheme();
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
          ownerSelected={owners?.owners?.[0]?._id}
          ownerSelectedUserId={owners?.owners?.[0]?.createdById}
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
      <Stepper
        activeStep={activeStep}
        steps={steps}
        nextStep={nextStep}
        onStepPress={onStepPress}
      />
    </>
  );
};
