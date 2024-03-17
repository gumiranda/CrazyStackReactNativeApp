import Splash from "@/assets/splash.jpg";
import { ImageBackground } from "react-native";
import appMetrics from "@/shared/libs/functions/metrics";

export const Test = ({ style, children }) => {
  return (
    <ImageBackground
      resizeMode="cover"
      style={{
        ...style,
        width: appMetrics.SCREEN_WIDTH,
        height: appMetrics.SCREEN_HEIGHT,
      }}
      source={Splash}
    >
      {children}
    </ImageBackground>
  );
};
