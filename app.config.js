/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config(); // Carrega variáveis do .env

export default {
  expo: {
    name: "crazystack",
    slug: "crazystack",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: false,
    assetBundlePatterns: ["**/*"],
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    packagerOpts: {
      config: "metro.config.js",
    },
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#8826d5",
    },
    android: {
      package: "br.com.crazystack",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY, // Lê do .env
        },
      },
    },
    ios: {
      bundleIdentifier: "br.com.crazystack",
      supportsTablet: true,
    },
  },
};
