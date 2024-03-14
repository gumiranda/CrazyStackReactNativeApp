import { ScrollView } from "react-native";
import { Button, SelectHookForm } from "@/shared/ui";
import { useServicesSelect } from "@/entities/service/serviceList.hook";
import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import appMetrics from "@/shared/libs/functions/metrics";
import { useStepServiceProfessional } from "./SelectServiceProfessional.lib";

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
    externalOnSubmit(payload);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useStepServiceProfessional();

  return (
    <>
      <ScrollView style={styles.container}>
        <SelectHookForm
          list={users}
          keyValue={"_id"}
          keyLabel={"name"}
          defaultValue={userSelected}
          placeholder={"Selecione um profissional"}
          control={control}
          errors={errors}
          name={"userList"}
          label={"Profissional prestador"}
          extraOnChange={handleChangeUserSelected}
        />
        <SelectHookForm
          list={services}
          keyValue={"_id"}
          keyLabel={"name"}
          defaultValue={serviceSelected}
          placeholder={"Selecione um Serviço"}
          control={control}
          errors={errors}
          name={"serviceList"}
          label={"Serviço"}
          extraOnChange={handleChangeServiceSelected}
        />
      </ScrollView>
      <Button
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        title={buttonTitle}
        backgroundColor={theme.colors.tertiary[300]}
        color={theme.colors.black}
      />
    </>
  );
};

const styles = DynamicStyleSheet.create(() => ({
  container: {
    flex: 1,
  },
  button: {
    width: appMetrics.SCREEN_WIDTH * 0.9,
    alignSelf: "center",
  },
}));
