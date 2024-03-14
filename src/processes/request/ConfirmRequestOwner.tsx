import { startOfDay } from "date-fns";
import { useUi } from "@/app/providers";
import { editRequestMutation } from "@/features/request/edit/editRequest.hook";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import appMetrics from "@/shared/libs/functions/metrics";
import { Button, MaterialIcon, TextAtom } from "@/shared/ui";
import { RFValue } from "react-native-responsive-fontsize";
import { RequestDetails } from "@/entities/request/components";

const content = "Verifique os dados abaixo para confirmar o agendamento:";

export const ConfirmRequestOwner = ({
  route: {
    params: {
      request: { requestCreated, currentService, clientCreated, newStatus },
    },
  },
}) => {
  const { initDate } = requestCreated;
  const theme = useTheme();
  const navigation = useNavigation();
  const { showModal } = useUi();
  const confirmAppointment = async () => {
    await editRequest.mutateAsync({
      ...requestCreated,
      date: startOfDay(initDate),
      status: newStatus,
    } as any);
  };
  const editRequest = editRequestMutation({
    currentRequest: requestCreated,
    showModal,
    routeRedirect: "HomePage",
    content: "Agendamento confirmado com sucesso, já pode ser visualizado na agenda.",
    navigation,
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <MaterialIcon
          type="AntDesign"
          name="checkcircleo"
          size={80}
          color={theme.colors.tertiary[400]}
          style={{ marginTop: 20 }}
        />

        <TextAtom style={styles.message}>{content}</TextAtom>

        {!!requestCreated && (
          <RequestDetails
            props={{
              request: requestCreated,
              service: currentService,
              client: clientCreated,
            }}
          />
        )}
      </ScrollView>
      <Button
        style={styles.button}
        onPress={confirmAppointment}
        title={"CONFIRMAR"}
        backgroundColor={theme.colors.tertiary[300]}
        color={theme.colors.black}
      />
    </View>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  button: {
    width: appMetrics.SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    marginBottom: 60,
  },
  footer: { backgroundColor: theme.colors.white },
  content: {
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    marginVertical: 40,
    fontSize: RFValue(16),
    color: theme.colors.text,
    fontFamily: fonts.primary_400,
    textAlign: "center",
    lineHeight: RFValue(25),
  },
  card: {
    borderRadius: 10,
    elevation: 6,
    backgroundColor: theme.colors.white,
    shadowOffset: { width: 2, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginBottom: 10,
    padding: 10,
  },
}));
