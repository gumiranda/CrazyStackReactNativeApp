import { useAuth, useUi } from "@/app/providers";
import { useNavigation } from "@react-navigation/native";
import { AuthByEmailFormData, useAuthByEmailLib } from "./auth-by-email.lib";
import { api, saveToken } from "@/shared/api";
import { setItemInAsyncStorage } from "@/shared/libs/functions/storage";
export const useAuthByEmail = () => {
  const navigation = useNavigation();
  const { setLoading } = useUi();
  const { setUser } = useAuth();
  const { control, handleSubmit, formState, setFocus } = useAuthByEmailLib();

  const signIn = async (values: AuthByEmailFormData) => {
    setLoading(true);

    try {
      // Faça a autenticação e obtenha o token de acesso
      const response = await api.post("/auth/login", {
        email: values.email,
        password: values.password,
        passwordConfirmation: values.password,
      });

      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      await saveToken({ type: "authorization", token: accessToken });
      await saveToken({ type: "refreshtoken", token: refreshToken });
      await setItemInAsyncStorage("user", response?.data?.user);

      setUser(response?.data?.user);
      navigation.navigate("HomePage", { user: response?.data?.user });
    } catch (error) {
      // Lide com erros de autenticação aqui
      console.error("Erro de autenticação:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn,
    control,
    handleSubmit,
    formState,
    setFocus,
  };
};
