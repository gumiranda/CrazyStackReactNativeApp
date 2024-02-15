import { useUi } from "@/app/providers";
import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
    <>
      <ScrollView style={styles.container}></ScrollView>
    </>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
  },
}));
