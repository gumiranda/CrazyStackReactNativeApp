import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

export interface CreateClientFormData {
  email: string;
  name: string;
  phone: string;
  userId: string;
}

export type SubmitCreateClientHandler = SubmitHandler<CreateClientFormData>;

export const createClientFormSchema = yup.object({
  name: yup.string().required("Campo obrigatório"),
  phone: yup
    .string()
    .required("Campo obrigatório")
    .max(15, "Telefone inválido")
    .min(15, "Telefone inválido"),
});

export type YupSchema = yup.InferType<typeof createClientFormSchema>;

export const useCreateClientLib = (defaultValues = { name: "", phone: "" }) => {
  const formProps = useForm<YupSchema>({
    mode: "onBlur",
    resolver: yupResolver(createClientFormSchema),
    defaultValues,
  });
  return formProps;
};
