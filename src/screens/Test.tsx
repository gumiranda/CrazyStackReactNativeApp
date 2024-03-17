import Splash from "@/assets/splash.jpg";
import { FullImageBackground } from "@/shared/ui";

export const Test = ({ style, children }) => {
  return (
    <FullImageBackground style={style} source={Splash}>
      {children}
    </FullImageBackground>
  );
};
