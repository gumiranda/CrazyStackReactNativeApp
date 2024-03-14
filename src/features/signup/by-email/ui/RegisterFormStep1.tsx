import React from "react";
import { useSignUpByEmail } from "../model/signup-by-email.hook";
import { SignUpFooterStep } from "./SignUpFooterStep";
import { View } from "react-native";
import { DynamicStyleSheet } from "@/shared/libs/utils";
import { Form } from "@/shared/ui";
export const RegisterFormStep1 = ({ nextStep, goToLogin, name, role }) => {
  const { step1FormProps, step1Submit } = useSignUpByEmail({ nextStep, role });
  const { control, handleSubmit, formState, setFocus } = step1FormProps;

  const formProps = {
    control,
    formState,
    handleSubmit,
    handleCustomSubmit: step1Submit,
    formControls: [
      {
        name: "name",
        iconName: "user",
        inputProps: {
          placeholder: name,
          returnKeyType: "next",
          returnKeyLabel: "next",
          onSubmitEditing: () => {
            setFocus("email");
          },
        },
      },
      {
        name: "email",
        iconName: "mail",
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
          maxLength: 15,
          onSubmitEditing: handleSubmit(step1Submit),
          mask: "(99) 99999-9999",
        },
      },
    ],
    defaultFooterStep: false,
    defaultFormControl: false,
  };
  const footerProps = {
    nextStep: handleSubmit(step1Submit),
    handleSignIn: goToLogin,
    isLogging: formState.isSubmitting,
    buttonText: "Próximo",
    step: 1,
  };
  return (
    <>
      <View style={styles.form}>
        <Form {...formProps} />
      </View>
      <SignUpFooterStep {...footerProps} />
    </>
  );
};

const styles = DynamicStyleSheet.create(() => ({
  form: {
    width: "100%",
    marginVertical: 38,
    marginHorizontal: 0,
  },
}));
