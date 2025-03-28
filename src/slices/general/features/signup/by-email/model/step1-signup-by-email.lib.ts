import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

export interface SignUpStep1ByEmailFormData {
  email: string;
  name: string;
  phone: string;
}

export type SubmitSignUpByEmailHandler = SubmitHandler<SignUpStep1ByEmailFormData>;

export const signUpStep1ByEmailSchema = yup.object({
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  name: yup.string().required("Campo obrigatório"),
  phone: yup
    .string()
    .required("Campo obrigatório")
    .max(15, "Telefone inválido")
    .min(15, "Telefone inválido"),
});

export type YupSchema = yup.InferType<typeof signUpStep1ByEmailSchema>;

export const useSignUpStep1ByEmailLib = (
  defaultValues = { email: "", name: "", phone: "" }
) => {
  const formProps = useForm<YupSchema>({
    mode: "onBlur",
    resolver: yupResolver(signUpStep1ByEmailSchema),
    defaultValues,
  });
  return formProps;
};
