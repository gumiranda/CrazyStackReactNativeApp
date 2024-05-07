import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

export interface SignInStep1ByEmailFormData {
  email: string;
  password: string;
}

export type SubmitSignInByEmailHandler = SubmitHandler<SignInStep1ByEmailFormData>;

export const signInStep1ByEmailSchema = yup.object({
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
});

export type YupSchema = yup.InferType<typeof signInStep1ByEmailSchema>;

export const useSignInStep1ByEmailLib = (defaultValues = { email: "", password: "" }) => {
  const formProps = useForm<YupSchema>({
    mode: "onBlur",
    resolver: yupResolver(signInStep1ByEmailSchema),
    defaultValues,
  });
  return formProps;
};
