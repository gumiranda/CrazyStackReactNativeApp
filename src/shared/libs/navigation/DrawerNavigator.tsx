import { config } from "@/app/config/whiteLabelConfig";
import { StackNavigator } from "./StackNavigator";
import { TouchableOpacity, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/app/providers";
import { DynamicStyleSheet, fonts } from "../utils";
import { RFValue } from "react-native-responsive-fontsize";
import { drawerRoutes } from "./Routes";
import { TextAtom } from "@/shared/ui";

const DrawerNav = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <DrawerNav.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <DrawerNav.Screen name={config.systemName} component={StackNavigator} />
    </DrawerNav.Navigator>
  );
};

const DrawerContent = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { logout, user } = useAuth();
  return (
    <View style={[{ paddingTop: insets.top }, styles.drawer]}>
      {drawerRoutes.map((route, index) => (
        <TouchableOpacity
          key={index}
          onPress={async () => {
            if (route.name === "Logout") {
              await logout();
              navigation.closeDrawer();
              return;
            }
            if (user?.role === "client") {
              return;
            }
            navigation.navigate(route.name);
          }}
        >
          <TextAtom style={styles.title}>{route.title}</TextAtom>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  drawer: {
    paddingBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.background,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRightColor: theme.colors.primary[500],
    borderRightWidth: 3,
  },
  title: {
    fontFamily: fonts.primary_500,
    fontSize: RFValue(18),
    color: theme.colors.primary[500],
    marginLeft: 16,
    marginVertical: 8,
  },
}));
