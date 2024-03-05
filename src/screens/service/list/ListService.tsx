/* eslint-disable react-hooks/rules-of-hooks */
import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAuth, useUi } from "@/app/providers";
import { FlashList } from "@shopify/flash-list";
import { useListService } from "./useListService.hook";

export const ListService = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const { showModal } = useUi();
  const result = useListService({ user });
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
