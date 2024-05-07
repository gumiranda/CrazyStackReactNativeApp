import { ImageBackground } from "react-native";
import { DynamicStyleSheet } from "@/shared/libs/utils";
import appMetrics from "@/shared/libs/functions/metrics";
const image = {
  uri: "https://i.ibb.co/gtHZ4Hd/Captura-de-Tela-2024-02-15-a-s-09-25-00.png",
};
type Props = {
  children: React.ReactNode;
  style: any;
};
export const RetangleBorded = ({ children, style = {} }: Props) => {
  return (
    <ImageBackground
      style={[styles.baseStyle, style]}
      source={image}
      data-testid="RetangleBordedTestId"
    >
      {children}
    </ImageBackground>
  );
};
const styles = DynamicStyleSheet.create(() => ({
  baseStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: appMetrics.SCREEN_WIDTH,
  },
}));
