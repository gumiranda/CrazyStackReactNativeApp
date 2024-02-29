import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export const genericSelectSchema = yup.object({
  timeAvailable: yup.object().required("Campo obrigatório"),
});
export type YupSchema = yup.InferType<typeof genericSelectSchema>;
export const useStepDate = () => {
  const formProps = useForm<YupSchema>({
    mode: "onBlur",
    resolver: yupResolver(genericSelectSchema),
    defaultValues: {
      timeAvailable: null,
    },
  });
  return formProps;
};
