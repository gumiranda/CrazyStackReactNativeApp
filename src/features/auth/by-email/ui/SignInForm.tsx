import React from "react";
import { View } from "react-native";
import { SignInFooter } from "./SignInFooter";
import { useAuthByEmail } from "../model/auth-by-email.hook";
import { Form } from "@/shared/ui";
import { DynamicStyleSheet } from "@/shared/libs/utils";

export const SignInForm = ({ children = null, navigation }) => {
  const { setFocus, signIn, formState, control, handleSubmit } = useAuthByEmail();

  const formProps = {
    control,
    formState,
    handleSubmit,
    handleCustomSubmit: signIn,
    formControls: [
      {
        name: "email",
        iconName: "mail",
        inputProps: {
          placeholder: "Digite seu e-mail",
          defaultValue: "",
          autoCapitalize: "none",
          returnKeyType: "next",
          returnKeyLabel: "next",
          keyboardType: "email-address",
          autoCorrect: false,
          onSubmitEditing: () => {
            setFocus("password");
          },
        },
      },
      {
        name: "password",
        iconName: "lock",
        password: true,
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
    defaultFooterStep: false,
    defaultFormControl: false,
  };
  function handleNewAccount() {
    navigation.navigate("RegisterPage");
  }
  const footerProps = {
    handleSignIn: handleSubmit(signIn),
    isLogging: formState.isSubmitting,
    handleNewAccount,
  };

  return (
    <>
      <View style={styles.form}>
        <Form {...formProps} />
        {children}
      </View>

      <SignInFooter {...footerProps} />
    </>
  );
};
const styles = DynamicStyleSheet.create(() => ({
  form: {
    width: "100%",
    marginVertical: 74,
    marginHorizontal: 0,
  },
}));
