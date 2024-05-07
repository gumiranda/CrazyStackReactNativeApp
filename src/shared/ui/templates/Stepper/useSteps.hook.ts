import { useState } from "react";

export const useSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const onStepPress = (newStep: number) => {
    if (newStep < activeStep) {
      //setActiveStep(newStep);
    }
  };
  const nextStep = () => {
    setActiveStep((prev) => prev + 1);
  };
  const prevStep = () => {
    setActiveStep((prev) => prev - 1);
  };
  return { activeStep, onStepPress, nextStep, prevStep };
};
