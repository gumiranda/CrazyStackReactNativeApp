import appMetrics from "@/shared/libs/functions/metrics";
import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import { Button } from "@/shared/ui";
import { ClientForm } from "@/slices/appointments/features/request/client/create/ClientForm";
import { useCreateClient } from "@/slices/appointments/features/request/client/create/createClient.hook";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { useCreateRequest } from "../context/CreateRequest.context";

export const StepClient = ({ userList, owner, nextStep }) => {
  const theme = useTheme();
  const { setRequest } = useCreateRequest();
  const { formState, control, handleSubmit, handleCreateClient, setFocus, createClient } =
    useCreateClient({ userList, owner });
  useEffect(() => {
    if (createClient?.data) {
      setRequest((prev) => ({ ...prev, clientCreated: createClient.data }));
      nextStep();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createClient?.data]);
  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ClientForm
          formProps={{ control, formState, handleSubmit, handleCreateClient, setFocus }}
        />
      </ScrollView>
      <Button
        style={styles.button}
        onPress={handleSubmit(handleCreateClient)}
        backgroundColor={theme.colors.tertiary[300]}
      >
        <Button.Title color={theme.colors.black}>PRÓXIMO</Button.Title>
      </Button>
    </>
  );
};
const styles = DynamicStyleSheet.create(() => ({
  button: { width: appMetrics.SCREEN_WIDTH * 0.9, alignSelf: "center" },
  scrollView: { paddingVertical: 0, paddingHorizontal: 16 },
}));
