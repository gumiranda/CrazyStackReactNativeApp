/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import { getHeaderTitle } from "@react-navigation/elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routesWithoutHeader, stackRoutes } from "./Routes";
import { TouchableOpacity, View } from "react-native";
import { useAuth } from "@/app/providers";
import { BackButton, MaterialIcon, TextAtom } from "@/shared/ui";
import { DynamicStyleSheet, fonts, useTheme } from "../utils";
import { RFValue } from "react-native-responsive-fontsize";
import { CommonActions } from "@react-navigation/native";
const Stack = createNativeStackNavigator();
const headerConfig = ({ navigation, route, options }) => {
  const { user, verifyIsAuthenticated } = useAuth();
  if (!verifyIsAuthenticated) return null;
  if (routesWithoutHeader.includes(route.name)) {
    return null;
  }
  const theme = useTheme();
  const title = getHeaderTitle(options, route.name);
  const canGoBack = navigation.canGoBack();
  const goToBack = () => {
    if (canGoBack) {
      navigation.goBack();
      return;
    }
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: user ? "HomePage" : "Initial" }],
      })
    );
  };
  return (
    <View style={styles.container}>
      {canGoBack && <BackButton onPress={goToBack} />}
      {!canGoBack && (
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <MaterialIcon
            type="Feather"
            name={"menu"}
            size={24}
            color={theme.colors.primary[500]}
          />
        </TouchableOpacity>
      )}

      <TextAtom style={styles.title}>{title === "Início" ? "belezix" : title}</TextAtom>
    </View>
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
const styles = DynamicStyleSheet.create((theme) => ({
  title: {
    fontFamily: fonts.primary_700,
    fontSize: RFValue(38),
    color: theme.colors.primary[500],
    marginLeft: 16,
  },
  container: {
    paddingTop: 10,
    paddingBottom: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "flex-start", //"space-between",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
}));
