import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setItemInAsyncStorage<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
}

export const parseJson = <T>(value: string | null): T | null => {
  try {
    const item = JSON.parse(value || "");
    return item;
  } catch (error) {
    return null;
  }
};

export async function getItemFromAsyncStorage<T>(key: string): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value || value === "") {
      return null;
    }
    return parseJson<T>(value);
  } catch (error) {
    console.error("Error getting item from AsyncStorage:", error);
    return null;
  }
}
