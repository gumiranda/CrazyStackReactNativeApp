import axios from "axios";
import { setItemInAsyncStorage } from "../libs/functions";
const IP_ADDRESS = "192.168.100.13";

export const api = axios.create({
  baseURL: process.env.BASE_URL,
});
export const api2 = axios.create({
  baseURL: `http://${IP_ADDRESS}:3333`,
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
