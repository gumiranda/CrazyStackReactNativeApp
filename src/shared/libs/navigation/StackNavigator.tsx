/* eslint-disable react-hooks/rules-of-hooks */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routesWithoutHeader, stackRoutes } from "./Routes";
import { DynamicStyleSheet, fonts, useTheme } from "../utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getHeaderTitle } from "@react-navigation/elements";
import { CommonActions } from "@react-navigation/native";
import { BackButton, MaterialIcon, TextAtom } from "@/shared/ui";
import { TouchableOpacity, View } from "react-native";
import { config } from "@/app/config/whiteLabelConfig";
import { RFValue } from "react-native-responsive-fontsize";
import React from "react";

const Stack = createNativeStackNavigator();

const headerConfig = ({ navigation, route, options }) => {
  if (routesWithoutHeader.includes(route.name)) {
    return null;
  }
  const theme = useTheme();
  const title = getHeaderTitle(options, route.name);
  const insets = useSafeAreaInsets();
  const canGoBack = navigation.canGoBack();
  const goToBack = () => {
    if (canGoBack) {
      navigation.goBack();
      return;
    }
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Initial" }] }));
  };
  const isInitPage = title === "Início";
  return (
    <View style={[{ paddingTop: insets.top }, styles.container]}>
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
      <TextAtom style={isInitPage ? styles.title : styles.subtitle}>
        {isInitPage ? config.systemName : title}
      </TextAtom>
    </View>
  );
};
export const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Initial" screenOptions={{ header: headerConfig }}>
      {stackRoutes.map((route, index) => (
        <React.Fragment key={index}>
          <Stack.Screen
            name={route.name}
            component={route.component}
            options={{ title: route?.title }}
          />
        </React.Fragment>
      ))}
    </Stack.Navigator>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  title: {
    fontSize: RFValue(38),
    color: theme.colors.primary[500],
    fontFamily: fonts.primary_700,
    marginLeft: 16,
  },
  subtitle: {
    fontSize: RFValue(18),
    color: theme.colors.primary[500],
    fontFamily: fonts.primary_400,
    marginLeft: 16,
    marginTop: 5,
  },
  container: {
    paddingBottom: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
}));
