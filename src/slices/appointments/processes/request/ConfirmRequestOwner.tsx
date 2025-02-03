import { startOfDay } from "date-fns";
import { useUi } from "@/app/providers";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import appMetrics from "@/shared/libs/functions/metrics";
import { Button, MaterialIcon, TextAtom } from "@/shared/ui";
import { RFValue } from "react-native-responsive-fontsize";
import { editRequestMutation } from "../../features/request/edit/editRequest.hook";
import { RequestDetails } from "../../entities/request/components";

export const ConfirmRequestOwner = ({
  route: {
    params: {
      request: { requestCreated, currentService, clientCreated, newStatus },
    },
  },
}) => {
  const content = "Verifique os dados abaixo para confirmar o agendamento:";

  const { initDate } = requestCreated;
  const theme = useTheme();
  const navigation = useNavigation();
  const { showModal } = useUi();
  const editRequest = editRequestMutation({
    currentRequest: requestCreated,
    showModal,
    routeRedirect: "HomePage",
    content: "Agendamento confirmado com sucesso, já pode ser visualizado na agenda.",
    navigation,
  });
  const confirmAppointment = async () => {
    await editRequest.mutateAsync({
      ...requestCreated,
      date: startOfDay(initDate),
      status: newStatus,
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <MaterialIcon
          type="AntDesign"
          size={80}
          name="checkcircleo"
          color={theme.colors.tertiary[400]}
          style={styles.icon}
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
        backgroundColor={theme.colors.tertiary[300]}
        onPress={confirmAppointment}
      >
        <Button.Title color={theme.colors.black}>CONFIRMAR</Button.Title>
      </Button>
    </View>
  );
};

const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  button: {
    width: appMetrics.SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    marginBottom: 60,
  },
  content: {
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { marginTop: 20 },
  message: {
    marginVertical: 40,
    fontSize: RFValue(16),
    color: theme.colors.text,
    fontFamily: fonts.primary_400,
    textAlign: "center",
    lineHeight: RFValue(25),
  },
}));
