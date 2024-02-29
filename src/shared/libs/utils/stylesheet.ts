import {
  Appearance,
  ColorSchemeName,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import { darkTheme, lightTheme } from "./theme";

export const DynamicStyleSheet = {
  create: <T extends NamedStyles<T> | NamedStyles<any>>(styles: Styles<T>): T => {
    const cache = new Map<ColorSchemeName, T>();
    const theme = Appearance.getColorScheme();
    const stylesObject = getStyles(styles, theme === "dark" ? darkTheme : lightTheme);

    cache.set(theme, stylesObject);

    const dynamicStyles: {
      [key: string]: ViewStyle | TextStyle | ImageStyle;
    } = {};

    for (const key in stylesObject) {
      Object.defineProperty(dynamicStyles, key, {
        enumerable: true,
        get() {
          const _theme = Appearance.getColorScheme();

          if (!cache.has(_theme)) {
            cache.set(
              _theme,
              getStyles(styles, _theme === "dark" ? darkTheme : lightTheme)
            );
          }
          const styleObject = cache.get(_theme);

          if (!styleObject) {
            throw new Error(
              `Could not get styleObject from cache ${JSON.stringify(cache)}`
            );
          }

          return styleObject[key];
        },
      });
    }

    return dynamicStyles as T;
  },
};

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

type Styles<T extends NamedStyles<T>> = ((theme: any) => T) | T;

function getStyles<T extends NamedStyles<T>>(styles: Styles<T>, theme: any): T {
  return StyleSheet.create(typeof styles === "function" ? styles(theme) : styles);
}
/*
EXEMPLO DE USO
const styles = DynamicStyleSheet.create((theme) => ({
  root: {
    backgroundColor: theme.colors.background,
  },
}));

*/
