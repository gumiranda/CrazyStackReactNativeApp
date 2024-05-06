import { useSignIn, useUi } from "@/app/providers";
import {
  SignInStep1ByEmailFormData,
  useSignInStep1ByEmailLib,
} from "./step1-signin-by-email.lib";
import { api } from "@/shared/api";

export const useSignInByEmail = ({ goToHome }) => {
  const { setLoading, showModal } = useUi();
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
      });
      if (response.status === 200) {
        goToHome({ role: response?.data?.user?.role });
      } else {
        showModal({
          content: "Usuário ou senha inválidos, tente novamente.",
          title: "Erro",
          type: "error",
          mainButton: "Ok, entendi",
        });
      }
    } catch (error) {
      showModal({
        content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
        title: "Erro no servidor",
        type: "error",
        mainButton: "Ok, entendi",
      });
    } finally {
      setLoading(false);
    }
  };
  return { step1FormProps, step1Submit };
};
