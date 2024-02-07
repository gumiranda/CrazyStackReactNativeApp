import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { mask as masker } from "remask";

export interface SignUpStep1ByEmailFormData {
  email: string;
  name: string;
  phone: string;
}
export type SubmitSignUpByEmailHandler = SubmitHandler<SignUpStep1ByEmailFormData>;

export const signUpStep1ByEmailSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  name: yup.string().required("Nome é obrigatório"),
  phone: yup
    .string()
    .required("Telefone é obrigatório")
    .max(11, "Telefone inválido")
    .min(11, "Telefone inválido")
    .test(
      "phone",
      "Telefone inválido",
      (value) => value && masker(value, ["(99) 99999-9999"]).length === 15
    ),
});

export const useSignUpStep1ByEmailLib = (
  defaultValues = { email: "", name: "", phone: "" }
) => {
  const formProps = useForm({
    mode: "onBlur",
    resolver: yupResolver(signUpStep1ByEmailSchema),
    defaultValues,
  });
  return formProps;
};
