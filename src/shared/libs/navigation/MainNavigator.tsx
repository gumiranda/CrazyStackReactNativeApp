import { DrawerNavigator } from "./DrawerNavigator";
import { NavigationContainer } from "@react-navigation/native";

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};
