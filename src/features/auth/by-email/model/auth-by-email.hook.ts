import { useAuth, useUi } from "@/app/providers";
import { useNavigation } from "@react-navigation/native";
import { AuthByEmailFormData, useAuthByEmailLib } from "./auth-by-email.lib";
import { api, saveToken } from "@/shared/api";
import { setItemInAsyncStorage } from "@/shared/libs/functions/storage";
import { CommonActions } from "@react-navigation/native";

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
      await Promise.all([
        saveToken({ type: "authorization", token: accessToken }),
        saveToken({ type: "refreshtoken", token: refreshToken }),
        setItemInAsyncStorage("user", response?.data?.user),
      ]);

      setUser(response?.data?.user);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "HomePage" }],
        })
      );
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
