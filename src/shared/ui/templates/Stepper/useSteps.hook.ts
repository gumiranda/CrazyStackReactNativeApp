import { useState } from "react";

export const useSteps = () => {
  const [step, setStep] = useState(0);
  const onStepPress = (newStep: number) => {
    if (newStep - 1 === step || newStep < step) {
      setStep(newStep);
    }
  };
  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };
  return { step, nextStep, prevStep, onStepPress };
};
