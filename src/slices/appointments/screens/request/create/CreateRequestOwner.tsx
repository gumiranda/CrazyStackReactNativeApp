import { DynamicStyleSheet } from "@/shared/libs/utils";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export const CreateRequestOwner = () => {
  return (
    <View style={styles.container}>
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
