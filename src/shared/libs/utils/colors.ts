import { darken, lighten } from "polished";

export const colors = {
  primary: {
    100: lighten(0.4, "#9f7aea"),
    200: lighten(0.3, "#9f7aea"),
    300: lighten(0.1, "#9f7aea"),
    400: "#9f7aea",
    500: "#8826d5",
    600: "#5f38e0",
    700: darken(0.1, "#8826d5"),
    800: darken(0.2, "#8826d5"),
  },
  secondary: {
    100: lighten(0.4, "#2e2e2e"),
    200: lighten(0.3, "#2e2e2e"),
    300: lighten(0.2, "#2e2e2e"),
    400: lighten(0.1, "#2e2e2e"),
    500: "#2e2e2e",
    600: "#212121",
    700: darken(0.1, "#212121"),
  },
  tertiary: {
    100: lighten(0.4, "#04D361"),
    200: lighten(0.3, "#04D361"),
    300: lighten(0.1, "#04D361"),
    400: "#04D361",
    500: darken(0.1, "#04D361"),
    600: darken(0.2, "#04D361"),
    700: darken(0.3, "#04D361"),
  },
  error: {
    100: "#FFD7D7",
    200: "#FFBFBF",
    300: "#FFA8A8",
    400: "#FF7A7A",
    500: "#DC1637",
    600: "#A21725",
    700: "#7A0E1C",
    800: "#660A18",
  },
  grey: {
    100: "#F2f9f9",
    200: "#eeeeee",
    300: "#e1e8ee",
    400: "#bdc6cf",
    500: "#bebebe",
    600: "#86939e",
    700: "#5e6977",
    800: "#43484d",
  },
  gray: {
    100: "#F2f9f9",
    200: "#eeeeee",
    300: "#e1e8ee",
    400: "#bdc6cf",
    500: "#bebebe",
    600: "#86939e",
    700: "#5e6977",
    800: "#43484d",
  },
  success: {
    100: "#D7F9D7",
    200: "#BFFBBF",
    300: "#A8FFA8",
    400: "#7AFF7A",
    500: "#16DC37",
    600: "#17A225",
    700: "#0E7A1C",
    800: "#0A6618",
  },
  blue: "#286ef0",
  black: "#000000",
  white: "#ffffff",
  darkBlue: "#2d328a",
};

export const lightColors = {
  ...colors,
  background: colors.white,
  text: colors.black,
  error: {
    100: "#FFD7D7",
    200: "#FFBFBF",
    300: "#FFA8A8",
    400: "#FF7A7A",
    500: "#DC1637",
    600: "#A21725",
    700: "#7A0E1C",
    800: "#660A18",
  },
  success: {
    100: "#D7F9D7",
    200: "#BFFBBF",
    300: "#A8FFA8",
    400: "#7AFF7A",
    500: "#16DC37",
    600: "#17A225",
    700: "#0E7A1C",
    800: "#0A6618",
  },
};
export const darkColors = {
  ...colors,
  background: colors.black,
  text: colors.white,
  error: {
    100: "#FFD7D7",
    200: "#FFBFBF",
    300: "#FFA8A8",
    400: "#FF7A7A",
    500: "#FFA9A9",
    600: "#A21725",
    700: "#7A0E1C",
    800: "#660A18",
  },
  success: {
    100: "#D7F9D7",
    200: "#BFFBBF",
    300: "#A8FFA8",
    400: "#7AFF7A",
    500: "#16DC37",
    600: "#17A225",
    700: "#0E7A1C",
    800: "#0A6618",
  },
  gray: {
    800: "#F2f9f9",
    700: "#eeeeee",
    600: "#e1e8ee",
    500: "#bdc6cf",
    400: "#bebebe",
    300: "#86939e",
    200: "#5e6977",
    100: "#43484d",
  },
};
