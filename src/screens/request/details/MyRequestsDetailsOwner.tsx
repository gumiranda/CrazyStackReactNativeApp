import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { RequestDetails } from "@/entities/request/components";
import { useRequestDetailsOwner } from "./useRequestDetailsOwner";
import { Button } from "@/shared/ui";
import appMetrics from "@/shared/libs/functions/metrics";
import { useAuth, useUi } from "@/app/providers";
import { useNavigation } from "@react-navigation/native";

export const MyRequestsDetailsOwner = ({
  route: {
    params: { item },
  },
}) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { serviceId, clientId } = item;
  const theme = useTheme();
  const { showModal } = useUi();
  const { service, client, deleteSelectedAction } = useRequestDetailsOwner({
    serviceId,
    clientId,
    currentRequest: item,
  });
  console.tron.log({ item, user });
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 16 }}>
        <RequestDetails
          props={{
            request: item,
            service,
            client,
          }}
        />
      </ScrollView>
      <Button
        style={styles.button}
        onPress={() => {
          navigation.navigate("ReScheduleServiceProfessional", { item, user, client });
        }}
        title={"REAGENDAR"}
        backgroundColor={theme.colors.background}
        color={theme.colors.primary[400]}
      />
      <Button
        style={styles.buttonError}
        onPress={() => {
          showModal({
            content: "Deseja realmente cancelar o agendamento?",
            title: "Cancelar agendamento",
            type: "error",
            dismissButton: "NÃO",
            mainButton: "SIM",
            onPress: () => {
              deleteSelectedAction(item);
            },
          });
        }}
        title={"CANCELAR"}
        backgroundColor={theme.colors.background}
        color={theme.colors.error[400]}
      />
      <StatusBar style="auto" />
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: appMetrics.SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: theme.colors.primary[400],
    marginBottom: 30,
  },
  buttonError: {
    width: appMetrics.SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: theme.colors.error[400],
    marginBottom: 60,
  },
}));
