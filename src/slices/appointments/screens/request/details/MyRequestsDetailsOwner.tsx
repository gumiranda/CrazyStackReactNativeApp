import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRequestDetailsOwner } from "./useRequestDetailsOwner";
import { Button } from "@/shared/ui";
import appMetrics from "@/shared/libs/functions/metrics";
import { useAuth, useUi } from "@/app/providers";
import { useNavigation } from "@react-navigation/native";
import { RequestDetails } from "@/slices/appointments/entities/request/components";

export const MyRequestsDetailsOwner = ({
  route: {
    params: { item },
  },
}) => {
  const theme = useTheme();
  const { showModal } = useUi();
  const navigation = useNavigation();
  const { user } = useAuth();
  const { serviceId, clientId } = item;
  const { service, client, deleteRequestAction } = useRequestDetailsOwner({
    serviceId,
    clientId,
    currentRequest: item,
  });
  console.tron.log({ item });
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <RequestDetails props={{ request: item, service, client }} />
      </ScrollView>
      {[1, 7, 4, 5, 6, 8].includes(item?.status) && (
        <Button
          style={styles.button}
          title={"REAGENDAR"}
          color={theme.colors.black}
          backgroundColor={theme.colors.primary[400]}
          onPress={() => {
            navigation.navigate("EditRequest", { item, user, client });
          }}
        />
      )}

      {[1, 7].includes(item?.status) && (
        <Button
          style={styles.buttonError}
          title={"CANCELAR"}
          color={theme.colors.black}
          backgroundColor={theme.colors.error[400]}
          onPress={() => {
            showModal({
              content: "Deseja realmente cancelar o agendamento?",
              title: "Cancelar agendamento",
              type: "error",
              dismissButton: "NÃO",
              mainButton: "SIM",
              onPress: () => {
                deleteRequestAction(item);
              },
            });
          }}
        />
      )}

      <StatusBar style="auto" />
    </View>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  scrollView: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
    marginBottom: 30,
  },
}));
