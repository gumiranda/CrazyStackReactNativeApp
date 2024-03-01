import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

export interface SignUpStep2ByEmailFormData {
  password: string;
  passwordConfirmation: string;
}
export type SubmitSignUpByEmailHandler = SubmitHandler<SignUpStep2ByEmailFormData>;

export const signUpStep2ByEmailSchema = yup.object({
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
  passwordConfirmation: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Confirmação de senha é obrigatória")
    .test("passwords-match", "As senhas devem ser iguais", function (value) {
      return this.parent.password === value;
    }),
});
export type YupSchema = yup.InferType<typeof signUpStep2ByEmailSchema>;

export const useSignUpStep2ByEmailLib = () => {
  const formProps = useForm<YupSchema>({
    mode: "onBlur",
    resolver: yupResolver(signUpStep2ByEmailSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });
  return formProps;
};
