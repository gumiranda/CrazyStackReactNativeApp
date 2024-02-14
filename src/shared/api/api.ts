import axios from "axios";
import { setItemInAsyncStorage } from "../libs/functions/storage";

export const api = axios.create({
  baseURL: process.env.BASE_URL,
});
export const saveToken = async ({ token, type }) => {
  if (token) {
    api.defaults.headers.common[type] = `Bearer ${token}`;
    await setItemInAsyncStorage(type, token);
  } else {
    delete api.defaults.headers.common[type];
  }
};
