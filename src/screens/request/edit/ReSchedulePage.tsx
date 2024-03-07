import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import appMetrics from "@/shared/libs/functions/metrics";
import { useUi } from "@/app/providers";
import { EditDate } from "@/processes/full-create-request/steps/StepDate";

export const ReSchedulePage = ({
  route: {
    params: { item },
  },
}) => {
  const { ownerId } = item;
  const { showModal } = useUi();
  return (
    <View style={styles.container}>
      <EditDate currentOwner={ownerId} currentRequest={item} showModal={showModal} />
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
  button: {
    width: appMetrics.SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: theme.colors.primary[400],
    marginBottom: 30,
  },
  buttonError: {
    width: appMetrics.SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: theme.colors.error[400],
    marginBottom: 60,
  },
}));
