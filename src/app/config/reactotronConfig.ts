import { NativeModules, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import url from "url";
import Reactotron from "reactotron-react-native";
const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);

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
