import { Appearance, ColorSchemeName } from "react-native";

import { darkColors, lightColors } from "./colors";
const testDark = false;
export const darkTheme = { dark: true, colors: darkColors };
export const lightTheme = { dark: testDark, colors: testDark ? darkColors : lightColors };
export const getNativeTheme = () => {
  return Appearance.getColorScheme();
};
export const getTheme = (theme: ColorSchemeName) => {
  return theme === "dark" ? darkTheme : lightTheme;
};
export const useTheme = () => {
  const theme = getNativeTheme();
  return getTheme(theme);
};
