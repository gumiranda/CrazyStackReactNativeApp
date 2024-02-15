import { useUi } from "@/app/providers";
import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export const CreateRequestOwner = () => {
  const navigation = useNavigation();
  const { setLoading } = useUi();
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingVertical: 0, paddingHorizontal: 16 }}
      ></ScrollView>
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
