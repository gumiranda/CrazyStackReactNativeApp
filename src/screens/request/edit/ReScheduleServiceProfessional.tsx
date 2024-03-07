import { DynamicStyleSheet } from "@/shared/libs/utils";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ServiceProfessionalSelect } from "@/features/request/select";
import { useNavigation } from "@react-navigation/native";

export const ReScheduleServiceProfessional = ({
  route: {
    params: { item, user, client },
  },
}) => {
  const navigation = useNavigation();
  const { ownerId } = item;
  const onSubmit = (payload) => {
    navigation.navigate("ReScheduleDate", { payload, client, user, item });
  };
  return (
    <View style={styles.container}>
      <ServiceProfessionalSelect
        ownerSelected={ownerId}
        ownerSelectedUserId={user?.id}
        externalOnSubmit={onSubmit}
        userDefaultSelected={item?.professionalId}
      />
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
