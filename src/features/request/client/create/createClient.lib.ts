import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
    .max(15, "Telefone inválido")
    .min(15, "Telefone inválido"),
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
