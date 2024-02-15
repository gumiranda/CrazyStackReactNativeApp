import { useUi } from "@/app/providers";
import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Stepper } from "@/shared/ui/templates/Stepper/Stepper";
import { useSteps } from "@/shared/ui/templates/Stepper/useSteps.hook";
import { FullCreateRequest } from "@/processes/full-create-request/FullCreateRequest";

export const CreateRequestOwner = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FullCreateRequest />
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
