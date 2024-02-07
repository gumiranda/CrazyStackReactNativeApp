import React from "react";
import { useSignUpByEmail } from "../model/signup-by-email.hook";
import { Form } from "@/shared/ui/templates";

export const SignUpFormStep2 = ({ goToLogin }) => {
  const { step2FormProps, step2Submit } = useSignUpByEmail({ goToLogin });
  const { control, handleSubmit, formState, setFocus } = step2FormProps;

  const formProps = {
    control,
    formState,
    handleSubmit,
    handleCustomSubmit: step2Submit,
    formControls: [
      {
        name: "password",
        iconName: "lock",
        inputProps: {
          placeholder: "Digite sua senha",
          returnKeyType: "next",
          returnKeyLabel: "next",
          autoCapitalize: "none",
          secureTextEntry: true,
          onSubmitEditing: () => {
            setFocus("passwordConfirmation");
          },
        },
      },
      {
        name: "passwordConfirmation",
        iconName: "lock",
        inputProps: {
          placeholder: "Confirme sua senha",
          defaultValue: "",
          autoCapitalize: "none",
          secureTextEntry: true,
          returnKeyType: "done",
          returnKeyLabel: "done",
          keyboardType: "default",
          onSubmitEditing: handleSubmit(step2Submit),
        },
      },
    ],
    buttonText: "Criar conta",
  };
  return <Form {...formProps} />;
};
