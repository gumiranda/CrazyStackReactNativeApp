import { View } from "react-native";
import { DynamicStyleSheet } from "@/shared/libs/utils";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const Footer = ({ children, style = {}, ...rest }) => {
  return (
    <View {...rest} style={[styles.baseStyle, style]} data-testid="FooterTestId">
      {children}
    </View>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  baseStyle: {
    backgroundColor: theme.colors.background,
    width: "100%",
    paddingTop: 24,
    paddingBottom: getBottomSpace() + 32,
    paddingHorizontal: 24,
  },
}));
