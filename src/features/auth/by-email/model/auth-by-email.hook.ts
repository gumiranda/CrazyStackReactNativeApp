import { useAuth, useUi } from "@/app/providers";
import { useNavigation } from "@react-navigation/native";
import { AuthByEmailFormData, useAuthByEmailLib } from "./auth-by-email.lib";
import { api, saveAccessToken } from "@/shared/api";
export const useAuthByEmail = () => {
  const navigation = useNavigation();
  const { setLoading } = useUi();
  const { dispatchUser } = useAuth();
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

      const accessToken = response.data.accessToken;

      // Configure o token de acesso nos cabeçalhos
      saveAccessToken(accessToken);

      // Navegue para a página desejada após a autenticação
      navigation.navigate("CarListPage");
    } catch (error) {
      // Lide com erros de autenticação aqui
      console.error('Erro de autenticação:', error);
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
