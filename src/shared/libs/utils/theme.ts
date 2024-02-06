import { Appearance, ColorSchemeName } from "react-native";
import { darkColors, lightColors } from "./colors";
export const darkTheme = {
  dark: true,
  colors: darkColors,
  // Add more style definitions for the dark theme
};

export const lightTheme = {
  //  dark: true,
  //colors: darkColors,
  dark: false,
  colors: lightColors,
  // Add more style definitions for the light theme
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
