import { DynamicStyleSheet } from "@/shared/libs/utils";
import { useSignUpByEmail } from "../model/signup-by-email.hook";
import { View } from "react-native";
import { Form } from "@/shared/ui";
import { SignUpFooterStep } from "./SignUpFooterStep";

export const SignUpFormStep2 = ({ role, goToLogin }) => {
  const { step2FormProps, step2Submit } = useSignUpByEmail({ goToLogin, role });
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
        password: true,
        inputProps: {
          placeholder: "Digite sua senha",
          returnKeyType: "next",
          returnKeyLabel: "next",
          autoCapitalize: "none",
          onSubmitEditing: () => setFocus("passwordConfirmation"),
        },
      },
      {
        name: "passwordConfirmation",
        iconName: "lock",
        password: true,
        inputProps: {
          placeholder: "Confirme sua senha",
          returnKeyType: "done",
          returnKeyLabel: "done",
          autoCapitalize: "none",
          keyboardType: "default",
          onSubmitEditing: () => handleSubmit(step2Submit),
        },
      },
    ],
    buttonText: "Criar conta",
    defaultFooterStep: false,
    defaultFormControl: false,
  };
  const footerProps = {
    nextStep: handleSubmit(step2Submit),
    handleSignIn: goToLogin,
    isLogging: formState.isSubmitting,
    buttonText: "Criar conta",
    step: 2,
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
