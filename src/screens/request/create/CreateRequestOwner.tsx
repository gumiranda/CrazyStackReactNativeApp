import { useUi } from "@/app/providers";
import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Stepper } from "@/shared/ui/templates/Stepper/Stepper";

export const CreateRequestOwner = () => {
  const navigation = useNavigation();
  const { setLoading } = useUi();
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Stepper
        steps={[
          { title: "Cliente", subtitle: "Nome e telefone" },
          {
            title: "Profissional e Serviço",
            subtitle: "Selecione o prestador e o serviço",
          },
          { title: "Data", subtitle: "Selecione dia e horário" },
        ]}
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
}));
