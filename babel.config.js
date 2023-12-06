/* eslint-disable no-undef */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      development: {
        plugins: [
          [
            "module-resolver",
            {
              root: ["./src"],
              alias: {
                "@": "./src",
              },
            },
          ],
          "inline-dotenv",
        ],
      },
      production: {
        plugins: [
          [
            "module-resolver",
            {
              root: ["./src"],
              alias: {
                "@": "./src",
              },
            },
          ],
          "inline-dotenv",
        ],
      },
    },
  };
};
