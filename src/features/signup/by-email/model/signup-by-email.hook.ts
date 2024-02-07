import { useSignUp, useUi } from "@/app/providers";
import { Alert } from "react-native";
import {
  SignUpStep1ByEmailFormData,
  useSignUpStep1ByEmailLib,
} from "./step1-signup-by-email.lib";
import {
  SignUpStep2ByEmailFormData,
  useSignUpStep2ByEmailLib,
} from "./step2-signup-by-email.lib";
import { api, saveAccessToken } from "@/shared/api";
export const useSignUpByEmail = ({ goToLogin = () => {}, nextStep = () => {}, role }) => {
  const { setLoading } = useUi();
  const { setEmail, email, setName, name, phone, setPhone } = useSignUp();
  const step1FormProps = useSignUpStep1ByEmailLib({ email, name, phone });
  const step2FormProps = useSignUpStep2ByEmailLib();

  const step1Submit = (values: SignUpStep1ByEmailFormData) => {
    setEmail(values?.email);
    setName(values?.name);
    setPhone(values?.phone);
    nextStep();
  };
  const step2Submit = async (values: SignUpStep2ByEmailFormData) => {
    const { password } = values;
    setLoading(true);
    try {
      const response = await api.post("/auth/signup", {
        password,
        email,
        passwordConfirmation: password,
        name,
        phoneNumber: phone,
        coord: {},
        role,
      });

      if (response.status === 200) {
        saveAccessToken(response?.data?.accessToken);
        Alert.alert("Parabéns", "Agora é só confirmar o e-mail e fazer o login!");
        goToLogin();
      } else {
        Alert.alert("Erro", "Ocorreu um erro ao processar a solicitação.");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao processar a solicitação.");
    } finally {
      setLoading(false);
    }
  };

  return {
    step1FormProps,
    step2FormProps,
    step1Submit,
    step2Submit,
  };
};
