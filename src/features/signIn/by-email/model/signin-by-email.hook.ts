import { useSignIn, useUi } from "@/app/providers";
import {
  SignInStep1ByEmailFormData,
  useSignInStep1ByEmailLib,
} from "./step1-signin-by-email.lib";
import { api } from "@/shared/api";
import { Alert } from "react-native";

export const useSignInByEmail = ({ goToHome = () => {} }) => {
  const { setLoading } = useUi();
  const { email } = useSignIn();
  const step1FormProps = useSignInStep1ByEmailLib({ email, password: "" });

  const step1Submit = async (values: SignInStep1ByEmailFormData) => {
    const { password, email } = values;
    setLoading(true);
    try {
      const response = await api.post("/auth/login", {
        password,
        email,
        passwordConfirmation: password,
        coord: {},
      });
      if (response.status === 200) {
        goToHome();
      } else {
        Alert.alert("Erro", "Erro ao entrar com usuário");
      }
    } catch (error) {
      Alert.alert("Erro", "Erro ao cadastrar usuário");
    } finally {
      setLoading(false);
    }
  };
  return { step1FormProps, step1Submit };
};
