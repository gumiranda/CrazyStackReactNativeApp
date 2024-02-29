import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StackNavigator } from "./StackNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { drawerRoutes } from "./Routes";
import { TouchableOpacity, View } from "react-native";
import { TextAtom } from "@/shared/ui";
import { useAuth } from "@/app/providers";
import { DynamicStyleSheet, fonts } from "../utils";
import { RFValue } from "react-native-responsive-fontsize";
const DrawerNav = createDrawerNavigator();

const DrawerContent = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { logout } = useAuth();
  return (
    <View style={[{ paddingTop: insets.top }, styles.drawer]}>
      {drawerRoutes?.map?.((route, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={async () => {
              if (route?.name === "Logout") {
                await logout();
                navigation.closeDrawer();
                return;
              }
              navigation.navigate(route?.name);
            }}
          >
            <TextAtom style={styles.title}>{route.title}</TextAtom>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export const DrawerNavigator = () => (
  <DrawerNav.Navigator
    drawerContent={(props) => <DrawerContent {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <DrawerNav.Screen name="Belezix" component={StackNavigator} />
  </DrawerNav.Navigator>
);
const styles = DynamicStyleSheet.create((theme) => ({
  drawer: {
    paddingBottom: 8,
    paddingHorizontal: 16,
    flexDirection: "column",
    justifyContent: "flex-start", //"space-between",
    flex: 1,
    backgroundColor: theme.colors.background,
    borderRightWidth: 1,
    borderRightColor: theme.colors.primary[500],
  },
  title: {
    fontFamily: fonts.primary_500,
    fontSize: RFValue(18),
    color: theme.colors.primary[500],
    marginLeft: 16,
    marginVertical: 8,
  },
}));
