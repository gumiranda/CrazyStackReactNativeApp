import axios from "axios";
import { setItemInAsyncStorage } from "../libs/functions/storage";

export const api = axios.create({
  baseURL: process.env.BASE_URL,
});
export const saveToken = async ({ token, type, persist = false }) => {
  if (token) {
    api.defaults.headers.common[type] = `Bearer ${token}`;
    if (persist) {
      await setItemInAsyncStorage(type, token);
    }
  } else {
    delete api.defaults.headers.common[type];
  }
};
