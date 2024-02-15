import { useUi } from "@/app/providers";
import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RentalPeriod } from "./components/RentalPeriod";
import { StatusBar } from "expo-status-bar";

export const MyRequestsDetailsOwner = ({
  route: {
    params: { item },
  },
}) => {
  const navigation = useNavigation();
  const { setLoading } = useUi();
  const theme = useTheme();
  console.tron.log({ item });
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingVertical: 0, paddingHorizontal: 16 }}>
        <RentalPeriod initDate={item?.initDateFormatted} endDate={item.endDateHour} />
      </ScrollView>
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
