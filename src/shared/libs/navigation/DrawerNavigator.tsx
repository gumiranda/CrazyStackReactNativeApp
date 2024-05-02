import { config } from "@/app/config/whiteLabelConfig";
import { StackNavigator } from "./StackNavigator";
import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const DrawerNav = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <DrawerNav.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={() => <View></View>}
    >
      <DrawerNav.Screen name={config.systemName} component={StackNavigator} />
    </DrawerNav.Navigator>
  );
};
