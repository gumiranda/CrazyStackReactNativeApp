import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setItemInAsyncStorage<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving item in AsyncStorage:", error);
  }
}
const parseJson = (json: string) => {
  try {
    const item = JSON.parse(json);
    return item;
  } catch (error) {
    return null;
  }
};
export async function getItemFromAsyncStorage<T>(key: string): Promise<T | null> {
  try {
    const item = await AsyncStorage.getItem(key);
    if (!item || item === "") {
      return null;
    }
    return parseJson(item) as T;
  } catch (error) {
    console.error("Error getting item from AsyncStorage:", error);
    return null;
  }
}
