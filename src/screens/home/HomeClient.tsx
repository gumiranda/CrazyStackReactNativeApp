import { DynamicStyleSheet } from "@/shared/libs/utils";
import { View } from "react-native";

import { TextAtom } from "@/shared/ui";
import { StatusBar } from "expo-status-bar";
import { RFValue } from "react-native-responsive-fontsize";

export const HomeClient = () => {
  return (
    <View style={styles.container}>
      <TextAtom style={styles.text}>
        {
          "Aplicativo para clientes ainda está em construção, aguarde novas atualizações.\n\nNo momento somente estabelecimentos podem agendar pelo Belezix."
        }
      </TextAtom>
      <StatusBar style="auto" />
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    alignItems: "center",
  },
  text: { color: theme.colors.text, fontSize: RFValue(18), margin: 20 },
}));
