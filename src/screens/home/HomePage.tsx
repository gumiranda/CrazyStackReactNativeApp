import appMetrics from "@/shared/libs/functions/metrics";
import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { View, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const HomePage = ({
  route: {
    params: { user },
  },
}) => {
  console.tron.log({ user });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: fonts.primary_700,
    color: theme.colors.primary[500],
    fontWeight: "bold",
    textAlign: "center",
    fontSize: RFValue(appMetrics.FONT_SIZE_TITLE),
    textShadowColor: theme.colors.grey[800],
    textShadowOffset: { width: 2.5, height: 2.5 },
    textShadowRadius: 5,
  },
}));
