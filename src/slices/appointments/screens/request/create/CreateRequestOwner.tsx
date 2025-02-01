import { DynamicStyleSheet } from "@/shared/libs/utils";
import { FullCreateRequest } from "@/slices/appointments/processes/request/create/FullCreateRequest";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

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
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
}));
