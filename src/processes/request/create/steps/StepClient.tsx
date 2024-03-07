import { ClientForm } from "@/features/request/client/create/ClientForm";
import { useCreateClient } from "@/features/request/client/create/createClient.hook";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { Button } from "@/shared/ui";
import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import appMetrics from "@/shared/libs/functions/metrics";
import { useCreateRequest } from "../context/CreateRequest.context";

export const StepClient = ({ userList, nextStep }) => {
  const theme = useTheme();
  const { setRequest = () => {} } = useCreateRequest() || {};
  const { formState, control, handleSubmit, handleCreateClient, setFocus, createClient } =
    useCreateClient({ userList });
  useEffect(() => {
    if (createClient?.data) {
      setRequest((prev) => ({ ...prev, clientCreated: createClient?.data }));
      nextStep();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createClient?.data]);
  return (
    <>
      <ScrollView contentContainerStyle={{ paddingVertical: 0, paddingHorizontal: 16 }}>
        <ClientForm
          formProps={{ control, formState, handleSubmit, handleCreateClient, setFocus }}
        />
      </ScrollView>
      <Button
        style={styles.button}
        onPress={handleSubmit(handleCreateClient)}
        title={"PRÓXIMO"}
        backgroundColor={theme.colors.tertiary[300]}
        color={theme.colors.black}
      />
    </>
  );
};
const styles = DynamicStyleSheet.create(() => ({
  button: {
    width: appMetrics.SCREEN_WIDTH * 0.9,
    alignSelf: "center",
  },
}));
