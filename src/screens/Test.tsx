//import Arrow from "@/assets/arrow.svg";
import Splash from "@/assets/splash.jpg";
import appMetrics from "@/shared/libs/functions/metrics";
import { useEffect } from "react";
import { ImageBackground } from "react-native";
export const Test = ({ children, style }) => {
  useEffect(() => {
    console.tron.log(process.env.BASE_URL);
  }, []);
  return (
    <>
      {/* <Arrow /> */}
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
    </>
  );
};
