import { View } from "react-native";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";

export const PasswordInput = ({ children, style = {}, ...rest }) => {
  const theme = useTheme();
  return (
    <View {...rest} style={[styles.baseStyle, style]} data-testid="InputTestId">
      {children}
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  baseStyle: {
    backgroundColor: theme.colors.primary[500],
  },
}));
