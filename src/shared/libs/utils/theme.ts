import { Appearance, ColorSchemeName } from "react-native";
import { darkColors, lightColors } from "./colors";
export const darkTheme = {
  dark: true,
  colors: darkColors,
};
const testDark = false;
export const lightTheme = {
  dark: testDark,
  colors: testDark ? darkColors : lightColors,
};
export const getNativeTheme = () => {
  return Appearance.getColorScheme();
};
export const getTheme = (theme: ColorSchemeName) => {
  return theme === "dark" ? darkTheme : lightTheme;
};
export const useTheme = () => {
  const theme = Appearance.getColorScheme();
  return getTheme(theme);
};
