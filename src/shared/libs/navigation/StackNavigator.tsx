/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import { getHeaderTitle } from "@react-navigation/elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routesWithoutHeader, stackRoutes } from "./Routes";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { useAuth } from "@/app/providers";
const Stack = createNativeStackNavigator();
const headerConfig = ({ navigation, route, options, back }) => {
  if (routesWithoutHeader.includes(route.name)) {
    return null;
  }
  const insets = useSafeAreaInsets();
  const title = getHeaderTitle(options, route.name);
  return (
    <View style={{ height: getStatusBarHeight(), backgroundColor: "transparent" }}></View>
  );
};
export const StackNavigator = () => {
  const { user, verifyIsAuthenticated } = useAuth();
  if (!verifyIsAuthenticated) return null;
  return (
    <Stack.Navigator
      initialRouteName={user ? "HomePage" : "Initial"}
      screenOptions={{
        header: headerConfig,
      }}
    >
      {/* <Stack.Screen
        name="Home"
        options={{ headerTitle: (props) => <Text {...props} /> }}
        component={TabNavigator}
      /> */}
      {stackRoutes?.map?.((route, index) => (
        <React.Fragment key={index}>
          <Stack.Screen
            name={route?.name}
            component={route?.component}
            options={{
              title: route?.title,
            }}
          />
        </React.Fragment>
      ))}
    </Stack.Navigator>
  );
};
