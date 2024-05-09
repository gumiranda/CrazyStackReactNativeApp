import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export type ExternalProps = {
  serviceId?: string;
  professionalId?: string;
  ownerId?: string;
  clientId?: string;
  clientUserId?: string;
  editdForId?: string;
  initDate?: string;
  endDate?: string;
  haveDelivery?: boolean;
  haveRecurrence?: boolean;
  haveFidelity?: boolean;
  haveRide?: boolean;
  type?: string;
  status?: number;
};
export type EditRequestFormData = ExternalProps & {
  message: string;
  userId?: string;
  active?: boolean;
};

export type SubmitEditRequestHandler = SubmitHandler<EditRequestFormData>;

export const editRequestFormSchema = yup.object({
  message: yup.string(),
});
export type YupSchema = yup.InferType<typeof editRequestFormSchema>;

export const useEditRequestLib = (props: ExternalProps) => {
  const formProps = useForm<YupSchema>({
    resolver: yupResolver(editRequestFormSchema),
    defaultValues: {
      message: "",
      ...props,
    },
  });
  return { ...formProps };
};
