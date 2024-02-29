import { startOfDay } from "date-fns";
import { useUi } from "@/app/providers";
import { editRequestMutation } from "@/features/request/edit/editRequest.hook";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import appMetrics from "@/shared/libs/functions/metrics";
import { Button, DateDetails, MaterialIcon, TextAtom, ViewField } from "@/shared/ui";
import { RFValue } from "react-native-responsive-fontsize";

const content = "Verifique os dados abaixo para confirmar o agendamento:";

export const ConfirmRequestOwner = ({
  route: {
    params: {
      request: { requestCreated, currentService, clientCreated },
    },
  },
}) => {
  const { initDate, endDate } = requestCreated;
  const theme = useTheme();
  const navigation = useNavigation();
  const { showModal } = useUi();
  const confirmAppointment = async () => {
    await editRequest.mutateAsync({
      ...requestCreated,
      date: startOfDay(initDate),
      status: 1,
    } as any);
  };
  const editRequest = editRequestMutation({
    currentRequest: requestCreated,
    showModal,
    routeRedirect: "HomePage",
    content: "Agendamento confirmado com sucesso, já pode ser visualizado na agenda.",
    navigation,
  });

  const duration = `${currentService?.duration} min`;
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
          <View>
            <DateDetails initDate={initDate} endDate={endDate} />
            <ViewField>
              <ViewField.Label>Cliente:</ViewField.Label>
              <ViewField.Description>{clientCreated?.name}</ViewField.Description>
            </ViewField>
            <ViewField>
              <ViewField.Label>Serviço:</ViewField.Label>
              <ViewField.Description>{currentService?.name}</ViewField.Description>
            </ViewField>
            <ViewField>
              <ViewField.Label>Duração:</ViewField.Label>
              <ViewField.Description>{duration}</ViewField.Description>
            </ViewField>
            <ViewField>
              <ViewField.Label>Preço:</ViewField.Label>
              <ViewField.PriceText>{currentService?.price}</ViewField.PriceText>
            </ViewField>
          </View>
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
