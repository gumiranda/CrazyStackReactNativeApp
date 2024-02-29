import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { mask as masker } from "remask";

export type CreateClientFormData = {
  name: string;
  active?: boolean;
  userId?: string;
  phone?: string;
};

export type SubmitCreateClientHandler = SubmitHandler<CreateClientFormData>;

export const createClientFormSchema = yup.object({
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
export type YupSchema = yup.InferType<typeof createClientFormSchema>;

export const useCreateClientLib = () => {
  const formProps = useForm<YupSchema>({
    mode: "onBlur",
    resolver: yupResolver(createClientFormSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });
  return { ...formProps };
};
