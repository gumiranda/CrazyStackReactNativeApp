import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StackNavigator } from "./StackNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { drawerRoutes } from "./Routes";
import { TouchableOpacity, View } from "react-native";
import { TextAtom } from "@/shared/ui";
import { useAuth } from "@/app/providers";
const DrawerNav = createDrawerNavigator();

const DrawerContent = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { logout } = useAuth();
  return (
    <View style={{ paddingTop: insets.top }}>
      {drawerRoutes?.map?.((route, index) => {
        if (route?.name === "Logout") {
          return (
            <TouchableOpacity
              key={index}
              onPress={async () => {
                await logout();
                navigation.closeDrawer();
              }}
            >
              <TextAtom>{route.title}</TextAtom>
            </TouchableOpacity>
          );
        }
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate(route?.name);
            }}
          >
            <TextAtom>{route.title}</TextAtom>
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
