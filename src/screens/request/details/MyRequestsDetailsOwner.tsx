import { useUi } from "@/app/providers";
import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RentalPeriod } from "./components/RentalPeriod";
import { StatusBar } from "expo-status-bar";
import { RequestDetails } from "@/entities/request/components";
import { useRequestDetailsOwner } from "./useRequestDetailsOwner";

export const MyRequestsDetailsOwner = ({
  route: {
    params: { item },
  },
}) => {
  const { serviceId, clientId } = item;
  const navigation = useNavigation();
  const { service, client } = useRequestDetailsOwner({ serviceId, clientId });
  const theme = useTheme();
  console.tron.log({ item, service });
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 16 }}>
        <RequestDetails
          props={{
            request: item,
            service,
            client,
          }}
        />
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
