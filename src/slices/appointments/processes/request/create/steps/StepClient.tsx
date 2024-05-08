import appMetrics from "@/shared/libs/functions/metrics";
import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import { Button } from "@/shared/ui";
import { ClientForm } from "@/slices/appointments/features/request/client/create/ClientForm";
import { useCreateClient } from "@/slices/appointments/features/request/client/create/createClient.hook";
import { ScrollView } from "react-native";

export const StepClient = ({ userList, nextStep }) => {
  const theme = useTheme();
  const { formState, control, handleSubmit, handleCreateClient, setFocus, createClient } =
    useCreateClient({ userList });
  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ClientForm
          formProps={{ control, formState, handleSubmit, handleCreateClient, setFocus }}
        />
      </ScrollView>
      <Button
        style={styles.button}
        title="PRÓXIMO"
        onPress={nextStep}
        backgroundColor={theme.colors.tertiary[300]}
        color={theme.colors.black}
      />
    </>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  button: { width: appMetrics.SCREEN_WIDTH * 0.9, alignSelf: "center" },
  scrollView: { paddingVertical: 0, paddingHorizontal: 16 },
}));
