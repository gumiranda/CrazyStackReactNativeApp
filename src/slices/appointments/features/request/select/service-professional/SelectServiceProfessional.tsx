import { useServicesSelect } from "@/slices/appointments/entities/service/serviceList.hook";

export const ServiceProfessionalSelect = ({
  ownerSelectedUserId,
  externalOnSubmit,
  buttonTitle = "PRÓXIMO",
  propsProfessional,
}) => {
  const theme = useTheme();
  const { userSelected, handleChangeUserSelected, users } = propsProfessional;
  const { serviceSelected, handleChangeServiceSelected, services } = useServicesSelect({
    ownerSelected: ownerSelectedUserId,
    userSelected,
    users,
  });
  return <></>;
};
