import { KeyboardAvoidingView } from "@/shared/ui";
import { SignUp } from "./templates/SignUp";
import { ScrollView } from "react-native";
import { DynamicStyleSheet } from "@/shared/libs/utils";
import { useSignUp } from "@/app/providers";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export const SignUpPage = ({
  route: {
    params: { name, role },
  },
}) => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const { setEmail, setName, setPhone } = useSignUp();

  const goToLogin = () => {
    navigation.navigate("SignInPage");
  };
  const nextStep = () => {
    setStep(step + 1);
  };
  useEffect(() => {
    return () => {
      setEmail("");
      setName("");
      setPhone("");
    };
  }, []);
  return (
    <>
      <KeyboardAvoidingView>
        <ScrollView style={styles.container}>
          <SignUp.Header
            props={{
              title: `Crie sua${"\n"}conta`,
              subtitle: `Faça seu cadastro de${"\n"}forma rápida e fácil`,
              handleBack: () => {
                if (step === 1) {
                  navigation.goBack();
                } else {
                  setStep(step - 1);
                }
              },
            }}
          />
          <SignUp
            props={{
              name,
              role,
              goToLogin,
              nextStep,
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style={"auto"} />
    </>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 24,
    backgroundColor: theme.colors.background,
    height: "100%",
  },
}));
