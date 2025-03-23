import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import { View, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Info = ({ icon: Icon, description }) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Icon size={20} color={theme.colors.gray[600]} />
      <Text style={styles.text}>{description}</Text>
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 4,
  },
  text: {
    fontSize: RFValue(14),
    color: theme.colors.gray[600],
    fontFamily: fonts.primary_400,
    lineHeight: RFValue(18),
    flex: 1,
  },
}));
