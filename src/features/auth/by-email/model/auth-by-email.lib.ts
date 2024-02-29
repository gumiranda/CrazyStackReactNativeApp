import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

export interface AuthByEmailFormData {
  email: string;
  password: string;
}
export type SubmitAuthByEmailHandler = SubmitHandler<AuthByEmailFormData>;

export const authByEmailSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

export const useAuthByEmailLib = () => {
  const formProps = useForm({
    mode: "onBlur",
    resolver: yupResolver(authByEmailSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return { ...formProps };
};
