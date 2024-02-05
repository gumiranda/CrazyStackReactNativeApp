import axios from "axios";

export const api = axios.create({
  baseURL: process.env.BASE_URL,
});
export const saveAccessToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};
