import { DynamicStyleSheet } from "@/shared/libs/utils";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FullCreateRequest } from "@/processes/full-create-request/FullCreateRequest";

export const CreateRequestOwner = () => {
  return (
    <View style={styles.container}>
      <FullCreateRequest />
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
