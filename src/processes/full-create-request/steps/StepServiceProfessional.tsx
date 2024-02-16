import { useUsersSelect } from "@/features/user/userList.hook";
import { useStepRequest } from "../context/StepRequest.context";
import { View, Text } from "react-native";
import { Button, Select } from "@/shared/ui";
import { useState } from "react";
import { useServicesSelect } from "@/entities/service/serviceList.hook";
import { SubmitHandler, Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export const StepServiceProfessional = ({
  ownerSelected,
  ownerSelectedUserId,
  nextStep,
}) => {
  console.tron.log({ ownerSelected, ownerSelectedUserId });
  const { setRequest } = useStepRequest();

  const { userSelected, handleChangeUserSelected, users } = useUsersSelect({
    ownerSelected,
  });
  const { serviceSelected, handleChangeServiceSelected, services } = useServicesSelect({
    ownerSelected: ownerSelectedUserId,
    userSelected,
    users,
  });
  console.tron.log({ users, userSelected, serviceSelected, services });
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
  } = useForm<YupSchema>({
    mode: "onBlur",
    resolver: yupResolver(genericSelectSchema),
    defaultValues: {
      selectedOption: "",
    },
  });
  return (
    <>
      {/* <Select
        bg="gray.100"
        labelColor="black"
        name="userList"
        label="Profissional prestador"
        list={users}
        value={userSelected}
        onChange={handleChangeUserSelected}
        keyValue="_id"
        keyLabel="name"
      >
        <option style={{ backgroundColor: "#7159c1" }} value="loadMore">
          Carregar mais
        </option>
      </Select>
      <Select
        bg="gray.100"
        labelColor="black"
        name="serviceList"
        label="Serviço"
        list={services}
        value={serviceSelected}
        onChange={handleChangeServiceSelected}
        keyValue="_id"
        keyLabel="name"
      >
        <option style={{ backgroundColor: "#7159c1" }} value="loadMore">
          Carregar mais
        </option>
      </Select> */}
      <View style={{ marginTop: 20 }} />
      <MyComponentHookForm
        list={users}
        keyValue={"_id"}
        keyLabel={"name"}
        defaultValue={userSelected}
        placeholder={"Selecione um profissional"}
        control={control}
        errors={errors}
        name={"selectedOption"}
        label={"Profissional prestador"}
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
}) => {
  return (
    <View>
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
          />
        )}
      />
      {errors[name] && <Text>Error: {errors[name].message}</Text>}
    </View>
  );
};
export const genericSelectSchema = yup.object({
  selectedOption: yup.string().required("Campo obrigatório"),
});
export type YupSchema = yup.InferType<typeof genericSelectSchema>;
