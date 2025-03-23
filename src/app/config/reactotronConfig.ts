import { NativeModules, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Reactotron from "reactotron-react-native";
const scriptURL = NativeModules.SourceCode ? NativeModules.SourceCode.scriptURL : "";
let hostname = "localhost"; // Default to localhost
if (scriptURL) {
  try {
    hostname = new URL(scriptURL).hostname;
  } catch (error) {
    console.warn("Invalid scriptURL, using default hostname");
  }
} else {
  console.warn("scriptURL is not available, using default hostname");
}
declare global {
  export interface Console {
    tron: any;
  }
}
if (__DEV__ && Platform.OS !== "web") {
  const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({
      host: hostname,
    })
    .useReactNative({
      asyncStorage: true,
      networking: { ignoreUrls: /symbolicate/ },
      editor: false, // there are more options to editor
      errors: { veto: () => false }, // or turn it off with false
      overlay: false, // just turning off overlay
    })
    .connect();
  tron.clear();
  console.tron = tron;
} else {
  const noop = () => undefined;
  console.tron = {
    configure: noop,
    connect: noop,
    use: noop,
    useReactNative: noop,
    clear: noop,
    log: noop,
    logImportant: noop,
    display: noop,
    error: noop,
    createEnhancer: noop,
  };
}
