import { useTheme } from "@/shared/libs/utils";
import { Button } from "@/shared/ui";
import React from "react";
import { View } from "react-native";

export const SignUpFooterStep = ({ buttonText, handleSignIn, isLogging, nextStep }) => {
  const theme = useTheme();
  return (
    <View>
      <Button
        title={buttonText}
        onPress={nextStep}
        enabled={!isLogging}
        loading={isLogging}
        color={theme.colors.white}
        backgroundColor={theme.colors.primary[600]}
      />

      <Button
        title="Já possuo conta"
        onPress={handleSignIn}
        color={theme.colors.black}
        backgroundColor={theme.colors.tertiary[300]}
        style={{ marginTop: 12 }}
      />
    </View>
  );
};
