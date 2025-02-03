import { ScrollView, Text } from "react-native";
import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { RFValue } from "react-native-responsive-fontsize";
import { Step } from "./Step";
import { IconMapPin, IconQrcode, IconTicket } from "@tabler/icons-react-native";

export function Steps() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Veja como funciona:</Text>
      <Step
        title={"Encontre estabelecimentos"}
        description={"Veja locais perto de voce que são parceiros Belezix"}
        icon={IconMapPin}
      />
      <Step
        title={"Ative o cupom com QR Code"}
        description={"Escaneie o código no estabelecimento para usar o benefício"}
        icon={IconQrcode}
      />
      <Step
        title={"Garanta vantagens perto de você"}
        description={"Ative cupons onde estiver, em diferentes tipos de estabelecimento"}
        icon={IconTicket}
      />
    </ScrollView>
  );
}
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    gap: 24,
  },
  title: {
    fontSize: RFValue(14),
    fontFamily: fonts.poppins_500,
    color: theme.colors.grey[600],
  },
}));
