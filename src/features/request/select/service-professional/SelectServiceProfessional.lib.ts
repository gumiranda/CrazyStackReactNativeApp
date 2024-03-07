import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export const genericSelectSchema = yup.object({
  userList: yup.object().required("Campo obrigatório"),
  serviceList: yup.object().required("Campo obrigatório"),
});
export type YupSchema = yup.InferType<typeof genericSelectSchema>;
export const useStepServiceProfessional = () => {
  const formProps = useForm<YupSchema>({
    mode: "onBlur",
    resolver: yupResolver(genericSelectSchema),
    defaultValues: {
      userList: null,
      serviceList: null,
    },
  });
  return formProps;
};
