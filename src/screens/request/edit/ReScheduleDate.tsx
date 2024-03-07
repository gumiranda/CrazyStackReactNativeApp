import { DynamicStyleSheet } from "@/shared/libs/utils";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useUi } from "@/app/providers";
import { useNavigation } from "@react-navigation/native";

export const ReScheduleDate = ({
  route: {
    params: { payload, client, user, item },
  },
}) => {
  const navigation = useNavigation();
  const { ownerId } = item;
  console.tron.log({ payload, client, user, item });
  return (
    <View style={styles.container}>
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
