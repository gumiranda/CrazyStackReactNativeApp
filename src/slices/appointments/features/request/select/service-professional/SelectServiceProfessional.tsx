import { useServicesSelect } from "@/slices/appointments/entities/service/serviceList.hook";
import { useStepServiceProfessional } from "./SelectServiceProfessional.lib";
import { ScrollView } from "react-native";
import { Button, SelectHookForm } from "@/shared/ui";
import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import appMetrics from "@/shared/libs/functions/metrics";

export const ServiceProfessionalSelect = ({
  ownerSelectedUserId,
  externalOnSubmit,
  buttonTitle = "PRÓXIMO",
  propsProfessional,
}) => {
  const theme = useTheme();
  const { userSelected, handleChangeUserSelected, users } = propsProfessional || {};
  const { serviceSelected, handleChangeServiceSelected, services } = useServicesSelect({
    ownerSelected: ownerSelectedUserId,
    userSelected,
    users,
  });
  const onSubmit = () => {
    const payload = {
      serviceId: serviceSelected,
      professionalId: userSelected,
      services,
      users,
    };
    externalOnSubmit?.(payload);
  };
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useStepServiceProfessional();

  return (
    <>
      <ScrollView style={styles.container}>
        <SelectHookForm
          list={users}
          keyValue={"_id"}
          control={control}
          defaultValue={userSelected}
          placeholder={"Selecione um profissional"}
          keyLabel={"name"}
          errors={errors}
          name={"userList"}
          label={"Profissional prestador"}
          extraOnChange={handleChangeUserSelected}
        />
        <SelectHookForm
          list={services}
          keyValue={"_id"}
          control={control}
          defaultValue={serviceSelected}
          placeholder={"Selecione um Serviço"}
          keyLabel={"name"}
          errors={errors}
          name={"serviceList"}
          label={"Serviço"}
          extraOnChange={handleChangeServiceSelected}
        />
      </ScrollView>
      <Button
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        backgroundColor={theme.colors.tertiary[300]}
      >
        <Button.Title color={theme.colors.black}>{buttonTitle}</Button.Title>
      </Button>
    </>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    margin: 20,
  },
  button: {
    width: appMetrics.SCREEN_WIDTH * 0.9,
    alignSelf: "center",
  },
}));
