import React from "react";
import { useAuthByEmail } from "../model/auth-by-email.hook";
import { Form } from "@/shared/ui";

export const LoginForm = () => {
  const { setFocus, signIn, formState, control, handleSubmit } = useAuthByEmail();
  const formProps = {
    control,
    formState,
    handleSubmit,
    handleCustomSubmit: signIn,
    formControls: [
      {
        name: "email",
        iconName: "email",
        inputProps: {
          placeholder: "Digite seu e-mail",
          defaultValue: "",
          autoCapitalize: "none",
          returnKeyType: "next",
          returnKeyLabel: "next",
          keyboardType: "default",
          onSubmitEditing: () => {
            setFocus("password");
          },
        },
      },
      {
        name: "password",
        iconName: "lock",
        inputProps: {
          placeholder: "Digite sua senha",
          defaultValue: "",
          autoCapitalize: "none",
          secureTextEntry: true,
          returnKeyType: "done",
          onSubmitEditing: handleSubmit(signIn),
        },
      },
    ],
    buttonText: "Entrar",
  };
  return <Form {...formProps} />;
};
