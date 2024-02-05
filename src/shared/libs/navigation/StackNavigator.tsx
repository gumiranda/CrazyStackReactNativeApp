/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import { getHeaderTitle } from "@react-navigation/elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routesWithoutHeader, stackRoutes } from "./Routes";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
const Stack = createNativeStackNavigator();
const headerConfig = ({ navigation, route, options, back }) => {
  if (routesWithoutHeader.includes(route.name)) {
    return null;
  }
  const insets = useSafeAreaInsets();
  const title = getHeaderTitle(options, route.name);
  return <View style={{ height: 10 }}></View>;
};
export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Initial"
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
