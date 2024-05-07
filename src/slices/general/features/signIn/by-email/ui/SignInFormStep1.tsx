import { DynamicStyleSheet } from "@/shared/libs/utils";
import { useSignInByEmail } from "../model/signin-by-email.hook";
import { View } from "react-native";
import { SignInFooterStep } from "./SignInFooterStep";
import { Form } from "@/shared/ui";
import { useNavigation } from "@react-navigation/native";

export const SignInFormStep1 = ({ goToHome }) => {
  const navigation = useNavigation();
  const { step1FormProps, step1Submit } = useSignInByEmail({ goToHome });
  const { control, handleSubmit, formState, setFocus } = step1FormProps;
  const formProps = {
    control,
    formState,
    handleSubmit,
    handleCustomSubmit: step1Submit,
    formControls: [
      {
        name: "email",
        iconName: "mail",
        inputProps: {
          placeholder: "Digite seu e-mail",
          autoCapitalize: "none",
          returnKeyType: "next",
          returnKeyLabel: "next",
          keyboardType: "email-address",
          onSubmiteEditing: () => setFocus("password"),
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
          onSubmitEditing: () => handleSubmit(step1Submit),
        },
      },
    ],
    defaultFooterStep: false,
    defaultFormControl: false,
  };
  function handleNewAccount() {
    navigation.navigate("SignUpPage", { name: "Nome completo", role: "client" });
  }
  const footerProps = {
    nextStep: handleSubmit(step1Submit),
    handleNewAccount,
    isLogging: formState.isSubmitting,
    buttonText: "Entrar",
    step: 1,
  };
  return (
    <>
      <View style={styles.form}>
        <Form {...formProps} />
      </View>
      <SignInFooterStep {...footerProps} />
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
