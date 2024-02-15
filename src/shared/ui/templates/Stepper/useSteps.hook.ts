import { useState } from "react";

export const useSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const onStepPress = (newStep: number) => {
    //if (newStep - 1 === step || newStep < step) {
    if (newStep < activeStep) {
      //setActiveStep(newStep);
    }
  };
  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };
  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };
  return { activeStep, nextStep, prevStep, onStepPress };
};
