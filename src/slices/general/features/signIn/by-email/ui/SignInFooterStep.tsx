import { useTheme } from "@/shared/libs/utils";
import { Button } from "@/shared/ui";
import { View } from "react-native";

export const SignInFooterStep = ({
  buttonText,
  handleNewAccount,
  isLogging,
  nextStep,
}) => {
  const theme = useTheme();
  return (
    <View>
      <Button
        onPress={nextStep}
        enabled={!isLogging}
        loading={isLogging}
        backgroundColor={theme.colors.primary[600]}
      >
        <Button.Title color={theme.colors.white}>{buttonText}</Button.Title>
      </Button>
      <Button
        onPress={handleNewAccount}
        backgroundColor={theme.colors.tertiary[300]}
        style={{ marginTop: 12 }}
      >
        <Button.Title color={theme.colors.black}>Criar conta gratuita</Button.Title>
      </Button>
    </View>
  );
};
