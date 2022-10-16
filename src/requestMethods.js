import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
const TOKEN = localStorage.getItem("accessToken") || "";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const privateRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
  withCredentials: true,
});
