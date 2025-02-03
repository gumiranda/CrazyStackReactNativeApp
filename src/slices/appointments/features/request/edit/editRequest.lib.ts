import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RequestProps } from "@/slices/appointments/entities/request";
export type EditRequestFormData = {
  message?: string;
  status?: number;
  clientId?: string;
  professionalId?: string;
  serviceId?: string;
  ownerId?: string;
  createdForId?: string;
  initDate?: string;
  endDate?: string;
  date?: string;
  haveRecurrence?: boolean;
  haveRide?: boolean;
  haveFidelity?: boolean;
  haveDelivery?: boolean;
  timeAvailable?: any;
  type?: any;
};

export type SubmitEditRequestHandler = SubmitHandler<EditRequestFormData>;

export const createRequestFormSchema = yup.object({
  message: yup.string(),
});
export type YupSchema = yup.InferType<typeof createRequestFormSchema>;

export const useEditRequestLib = (props: EditRequestFormProps) => {
  const { request: currentRequest } = props;

  const formProps = useForm<YupSchema>({
    resolver: yupResolver(createRequestFormSchema),
    defaultValues: {
      message: currentRequest?.message ?? "",
      ...props,
    },
  });
  return { ...formProps };
};
export interface EditRequestFormProps {
  request: RequestProps;
}
