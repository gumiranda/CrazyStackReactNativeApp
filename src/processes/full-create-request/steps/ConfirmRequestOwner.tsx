import { format, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useUi } from "@/app/providers";
import { editRequestMutation } from "@/features/request/edit/editRequest.hook";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import DoneSvg from "@/assets/done.svg";
import appMetrics from "@/shared/libs/functions/metrics";
import { Button, MaterialIcon, TextAtom } from "@/shared/ui";
import { RFValue } from "react-native-responsive-fontsize";
const content = "Verifique os dados abaixo para confirmar o agendamento:";
export const ConfirmRequestOwner = ({
  route: {
    params: { request },
  },
}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { showModal } = useUi();
  const confirmAppointment = async () => {
    await editRequest.mutateAsync({
      ...request?.requestCreated,
      date: startOfDay(request?.requestCreated.initDate),
      status: 1,
    } as any);
  };
  const editRequest = editRequestMutation({
    currentRequest: request?.requestCreated,
    showModal,
    routeRedirect: "HomePage",
    content: "Agendamento confirmado com sucesso, já pode ser visualizado na agenda.",
    navigation,
  });
  const initDate = formatDate(new Date(request?.requestCreated?.initDate));
  //const confirmDate = "  ";
  const confirmDate = `${format(
    new Date(request?.requestCreated?.initDate ?? null),
    "HH:mm",
    {
      locale: ptBR,
    }
  )} - ${format(new Date(request?.requestCreated?.endDate ?? null), "HH:mm", {
    locale: ptBR,
  })}`;
  const serviceName = `${request?.currentService?.name}`;
  const priceText = `${request?.currentService?.price?.toLocaleString?.("pt-BR", {
    style: "currency",
    currency: "BRL",
  })}`;
  const duration = `${request?.currentService?.duration} min`;
  console.tron.log({ requestt: request, initDate, confirmDate });
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

        {!!request?.requestCreated && (
          <View>
            <TextAtom style={styles.day}>{initDate}</TextAtom>
            <View>
              <TextAtom style={styles.confirmDate}>{confirmDate}</TextAtom>
            </View>
            <View style={styles.viewField}>
              <TextAtom style={styles.label}>Cliente:</TextAtom>
              <TextAtom style={styles.clientName}>
                {request?.clientCreated?.name}
              </TextAtom>
            </View>
            <View style={styles.viewField}>
              <TextAtom style={styles.label}>Serviço:</TextAtom>
              <TextAtom style={styles.clientName}>{serviceName}</TextAtom>
            </View>
            <View style={styles.viewField}>
              <TextAtom style={styles.label}>Duração:</TextAtom>
              <TextAtom style={styles.clientName}>{duration}</TextAtom>
            </View>
            <View style={styles.viewField}>
              <TextAtom style={styles.label}>Preço:</TextAtom>
              <TextAtom style={styles.priceText}>{priceText}</TextAtom>
            </View>
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
const formatDateHours = (date) => {
  return new Date(date).toLocaleDateString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    weekday: "long",
  });
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
  day: {
    color: theme.colors.text,
    fontSize: RFValue(15),
    fontFamily: fonts.primary_400,
    textAlign: "center",
    marginTop: 3,
    textTransform: "capitalize",
  },
  viewField: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 5,
  },
  label: {
    color: theme.colors.text,
    fontSize: RFValue(15),
    fontFamily: fonts.primary_500,
    textAlign: "center",
    marginTop: 3,
  },
  priceText: {
    color: theme.colors.tertiary[500],
    fontSize: RFValue(15),
    fontFamily: fonts.primary_600,
    textAlign: "center",
    marginTop: 3,
  },
  clientName: {
    color: theme.colors.text,
    fontSize: RFValue(15),
    fontFamily: fonts.primary_400,
    textAlign: "center",
    marginTop: 3,
  },
  text: {
    color: theme.colors.text,
    fontSize: RFValue(15),
    fontFamily: fonts.primary_400,
    textAlign: "center",
    marginTop: 3,
  },
  confirmDate: {
    color: theme.colors.text,
    fontSize: RFValue(15),
    fontFamily: fonts.primary_600,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 25,
  },
  footer: { backgroundColor: theme.colors.white },
  content: {
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: RFValue(30),
    color: theme.colors.text,
    fontFamily: fonts.secondary_600,
    marginTop: 10,
    textAlign: "center",
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
