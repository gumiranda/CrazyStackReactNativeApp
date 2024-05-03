import { View } from "react-native";
import { DynamicStyleSheet, fonts, useTheme } from "@/shared/libs/utils";
import { TextAtom } from "../../atoms";

export const Form = ({ style = {}, ...rest }) => {
  const theme = useTheme();
  return <View {...rest} style={[styles.baseStyle, style]} data-testid="FormTestId" />;
};
const styles = DynamicStyleSheet.create((theme) => ({
  baseStyle: {
    backgroundColor: theme.colors.primary[500],
    height: 100,
  },
}));
