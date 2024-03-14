import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

export interface AuthByEmailFormData {
  email: string;
  password: string;
}
export type SubmitAuthByEmailHandler = SubmitHandler<AuthByEmailFormData>;

export const authByEmailSchema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});
export type YupSchema = yup.InferType<typeof authByEmailSchema>;

export const useAuthByEmailLib = () => {
  const formProps = useForm<YupSchema>({
    mode: "onBlur",
    resolver: yupResolver(authByEmailSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return { ...formProps };
};
