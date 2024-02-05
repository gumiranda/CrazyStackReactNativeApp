import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./StackNavigator";

function MainNavigator() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
export default MainNavigator;
