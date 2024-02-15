// import { useUsersSelect } from "@/features/user/userList.hook";
// import {
//   CreateClientFormData,
//   SubmitCreateClientHandler,
//   useCreateClientLib,
// } from "@/features/client/create/createClient.lib";
// import { useStepRequest } from "../context/StepRequest.context";
// import { createClientMutation } from "@/features/client/create/createClient.hook";
// import { useEffect } from "react";

import { ClientForm } from "@/features/request/client/create/ClientForm";
import { useCreateClient } from "@/features/request/client/create/createClient.hook";
import { useStepRequest } from "../context/StepRequest.context";
import { useEffect } from "react";

export const StepClient = ({ userList, nextStep }) => {
  const { setRequest = () => {} } = useStepRequest() || {};
  const {
    formState,
    control,
    handleSubmit,
    handleCreateClient,
    // userSelected,
    // handleChangeUserSelected,
    // users,
    setFocus,
    createClient,
  } = useCreateClient({ userList });
  useEffect(() => {
    if (createClient?.data) {
      setRequest((prev) => ({ ...prev, clientCreated: createClient?.data }));
      nextStep();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createClient?.data]);
  return (
    <>
      <ClientForm
        formProps={{ control, formState, handleSubmit, handleCreateClient, setFocus }}
      />
    </>
  );
};
