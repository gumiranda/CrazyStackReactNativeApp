import { useTheme } from "@/shared/libs/utils";
import { Button } from "@/shared/ui";
import React from "react";
import { View } from "react-native";

export const SignInFooter = ({ handleSignIn, isLogging, handleNewAccount }) => {
  const theme = useTheme();
  return (
    <View>
      <Button
        title="Entrar"
        onPress={handleSignIn}
        enabled={!isLogging}
        loading={isLogging}
        color={theme.colors.white}
        backgroundColor={theme.colors.primary[600]}
      />

      <Button
        color={theme.colors.black}
        backgroundColor={theme.colors.tertiary[300]}
        title="Criar conta gratuita"
        onPress={handleNewAccount}
        style={{ marginTop: 12 }}
      />
    </View>
  );
};
