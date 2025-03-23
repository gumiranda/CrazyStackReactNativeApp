import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { Image, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Welcome = () => {
  return (
    <View>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Boas vindas ao Belezix</Text>
      <Text style={styles.subtitle}>
        Tenha cupons de vantagem para usar em seus estabelecimentos favoritos.
      </Text>
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  logo: { width: 48, height: 48, marginTop: 24, marginBottom: 12 },
  title: {
    fontSize: RFValue(18),
    fontFamily: fonts.poppins_700,
    color: theme.colors.gray[700],
  },
  subtitle: {
    fontSize: RFValue(14),
    fontFamily: fonts.poppins_400,
    color: theme.colors.gray[600],
    marginTop: 12,
  },
}));
