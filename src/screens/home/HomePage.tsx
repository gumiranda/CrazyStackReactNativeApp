import { useAuth, useUi } from "@/app/providers";
import appMetrics from "@/shared/libs/functions/metrics";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import { Button } from "@/shared/ui";
import { View, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const HomePage = () => {
  const { setLoading } = useUi();
  const { user, logout } = useAuth();
  const theme = useTheme();
  console.tron.log({ user });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Button
        title={"Sair"}
        color={theme.colors.primary[500]}
        onPress={async () => {
          setLoading(true);
          await logout();
          setLoading(false);
        }}
        backgroundColor={theme.colors.background}
      >
        Sair
      </Button>
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
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
