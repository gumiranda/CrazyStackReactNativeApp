import { useUsersSelect } from "@/features/user/userList.hook";
import { useStepRequest } from "../context/StepRequest.context";
import { ScrollView } from "react-native";
import { Button, SelectHookForm } from "@/shared/ui";
import { useServicesSelect } from "@/entities/service/serviceList.hook";
import { useStepServiceProfessional } from "./StepServiceProfessional.lib";
import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import appMetrics from "@/shared/libs/functions/metrics";

export const StepServiceProfessional = ({
  ownerSelected,
  ownerSelectedUserId,
  nextStep,
}) => {
  const theme = useTheme();
  const { setRequest } = useStepRequest();

  const { userSelected, handleChangeUserSelected, users } = useUsersSelect({
    ownerSelected,
  });
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
    };
    setRequest((prev) => ({ ...prev, ...payload, users }));
    nextStep();
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
        title={"PRÓXIMO"}
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
