import appMetrics from "@/shared/libs/functions/metrics";
import { ImageBackground } from "react-native";
export const FullImageBackground = ({ children, style, source }) => {
  return (
    <ImageBackground
      resizeMode="cover"
      style={{
        ...style,
        width: appMetrics.SCREEN_WIDTH,
        height: appMetrics.SCREEN_HEIGHT,
      }}
      source={source}
    >
      {children}
    </ImageBackground>
  );
};
