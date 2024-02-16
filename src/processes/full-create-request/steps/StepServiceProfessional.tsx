import { useUsersSelect } from "@/features/user/userList.hook";
import { useStepRequest } from "../context/StepRequest.context";
import { View, Text, ScrollView } from "react-native";
import { Button, Select } from "@/shared/ui";
import { useState } from "react";
import { useServicesSelect } from "@/entities/service/serviceList.hook";
import { SubmitHandler, Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
        <MyComponentHookForm
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
        <MyComponentHookForm
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
const MyComponentHookForm = ({
  control,
  list,
  defaultValue,
  placeholder,
  keyValue,
  keyLabel,
  errors,
  name,
  label,
  extraOnChange,
}) => {
  return (
    <View style={styles.containerSelect}>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Select
            options={list}
            onSelect={onChange}
            placeholder={placeholder}
            selectedValue={value}
            keyValue={keyValue}
            keyLabel={keyLabel}
            label={label}
            extraOnChange={extraOnChange}
          />
        )}
      />
      {errors[name] && <Text style={styles.errorMessage}>{errors[name].message}</Text>}
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  button: {
    width: appMetrics.SCREEN_WIDTH * 0.9,
    alignSelf: "center",
  },
  errorMessage: {
    color: theme.colors.error[500],
    fontSize: 14,
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  containerSelect: {
    marginHorizontal: 16,
  },
}));
