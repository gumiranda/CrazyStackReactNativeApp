// import { useUsersSelect } from "@/features/user/userList.hook";
// import {
//   CreateClientFormData,
//   SubmitCreateClientHandler,
//   useCreateClientLib,
// } from "@/features/client/create/createClient.lib";
// import { useStepRequest } from "../context/StepRequest.context";
// import { createClientMutation } from "@/features/client/create/createClient.hook";
// import { useEffect } from "react";

export const StepClient = ({ userList, nextStep }) => {
  // const { setRequest = () => {} } = useStepRequest() || {};
  // const { userSelected, users } = useUsersSelect({
  //   role: "client",
  //   userList,
  // });
  // const { register, handleSubmit, formState } = useCreateClientLib();
  // const createClient = createClientMutation(() => {}, null);
  // const handleCreateClient: SubmitCreateClientHandler = async (
  //   values: CreateClientFormData
  // ) => {
  //   const payload = {
  //     ...values,
  //     clientUserId: userSelected ?? users?.[0]?._id,
  //   };
  //   await createClient.mutateAsync({
  //     ...values,
  //     active: true,
  //     userId: userSelected ?? users?.[0]?._id,
  //   });
  //   setRequest((prev) => ({ ...prev, ...payload }));
  // };
  // useEffect(() => {
  //   if (createClient?.data) {
  //     setRequest((prev) => ({ ...prev, clientCreated: createClient?.data }));
  //     nextStep();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [createClient?.data]);
  return (
    <>
      {/* <FormControl
        label="Nome do(a) cliente"
        error={formState.errors.name}
        labelColor="black"
        bgColor="gray.100"
        bgColorHover="gray.100"
        {...register("name")}
      />
      <FormControl
        label="Telefone"
        error={formState.errors.phone}
        labelColor="black"
        bgColor="gray.100"
        bgColorHover="gray.100"
        type="tel"
        mask="(99) 99999-9999"
        {...register("phone")}
      /> */}
    </>
  );
};
