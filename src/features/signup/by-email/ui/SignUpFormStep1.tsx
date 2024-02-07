import React from "react";
import { useSignUpByEmail } from "../model/signup-by-email.hook";
import { Form } from "@/shared/ui/templates";

export const SignUpFormStep1 = ({ nextStep }) => {
  const { step1FormProps, step1Submit } = useSignUpByEmail({ nextStep });
  const { control, handleSubmit, formState, setFocus } = step1FormProps;

  const formProps = {
    control,
    formState,
    handleSubmit,
    handleCustomSubmit: step1Submit,
    formControls: [
      {
        name: "name",
        iconName: "person",
        inputProps: {
          placeholder: "Nome completo",
          returnKeyType: "next",
          returnKeyLabel: "next",
          onSubmitEditing: () => {
            setFocus("email");
          },
        },
      },
      {
        name: "email",
        iconName: "email",
        inputProps: {
          placeholder: "Digite seu e-mail",
          autoCapitalize: "none",
          returnKeyType: "next",
          returnKeyLabel: "next",
          keyboardType: "email-address",
          onSubmitEditing: () => {
            setFocus("phone");
          },
        },
      },
      {
        name: "phone",
        iconName: "phone",
        inputProps: {
          placeholder: "Digite seu telefone",
          autoCapitalize: "none",
          returnKeyType: "done",
          returnKeyLabel: "done",
          keyboardType: "phone-pad",
          maxLength: 11,
          onSubmitEditing: handleSubmit(step1Submit),
        },
      },
    ],
    buttonText: "Prosseguir",
  };
  return <Form {...formProps} />;
};
