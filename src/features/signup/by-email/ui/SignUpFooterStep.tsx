import { useTheme } from "@/shared/libs/utils";
import { Button } from "@/shared/ui";
import { View } from "react-native";

export const SignUpFooterStep = ({ buttonText, handleSignIn, isLogging, nextStep }) => {
  const theme = useTheme();
  return (
    <View>
      <Button
        title={buttonText}
        color={theme.colors.white}
        onPress={nextStep}
        enabled={!isLogging}
        loading={isLogging}
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
