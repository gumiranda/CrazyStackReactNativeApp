import { Image, Text, View } from "react-native";
import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { RFValue } from "react-native-responsive-fontsize";

export function Welcome() {
  return (
    <View>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Boas vindas ao Belezix!</Text>
      <Text style={styles.subtitle}>
        Tenha cupons de vantagem para usar em {"\n"}seus estabelecimentos favoritos.
      </Text>
    </View>
  );
}
const styles = DynamicStyleSheet.create((theme) => ({
  logo: {
    width: 48,
    height: 48,
    marginTop: 24,
    marginBottom: 28,
  },
  title: {
    fontSize: RFValue(24),
    fontFamily: fonts.poppins_700,
    color: theme.colors.grey[700],
  },
  subtitle: {
    fontSize: RFValue(16),
    fontFamily: fonts.poppins_400,
    color: theme.colors.grey[600],
    marginTop: 12,
  },
}));
