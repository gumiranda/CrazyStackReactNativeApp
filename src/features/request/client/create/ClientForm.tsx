import React from "react";
import { View } from "react-native";
import { DynamicStyleSheet } from "@/shared/libs/utils";
import { Form } from "@/shared/ui";
export const ClientForm = ({
  formProps: { control, formState, handleSubmit, handleCreateClient, setFocus },
}) => {
  const formProps = {
    control,
    formState,
    handleSubmit,
    handleCustomSubmit: handleCreateClient,
    formControls: [
      {
        name: "name",
        iconName: "user",
        inputProps: {
          placeholder: "Nome do cliente",
          returnKeyType: "next",
          returnKeyLabel: "next",
          onSubmitEditing: () => {
            setFocus("phone");
          },
        },
      },

      {
        name: "phone",
        iconName: "phone",
        inputProps: {
          placeholder: "Digite seu telefone",
          autoCapitalize: "none",
          returnKeyType: "done",
          returnKeyLabel: "done",
          keyboardType: "phone-pad",
          maxLength: 15,
          onSubmitEditing: handleSubmit(handleCreateClient),
          mask: "(99) 99999-9999",
        },
      },
    ],
    defaultFooterStep: false,
    defaultFormControl: false,
  };
  return (
    <>
      <View style={styles.form}>
        <Form {...formProps} />
      </View>
    </>
  );
};

const styles = DynamicStyleSheet.create(() => ({
  form: {
    width: "100%",
    marginVertical: 38,
    marginHorizontal: 0,
  },
}));
