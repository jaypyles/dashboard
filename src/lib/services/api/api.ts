import { setupCache } from "axios-cache-interceptor";
import axios from "axios";

const cacheApi = setupCache(
  axios.create({
    baseURL: `http://localhost:8000/api`,
    timeout: 20000,
    headers: {
      "Content-Type": "application/json",
    },
  }),
  {
    ttl: 30 * 1000,
  }
);

const api = axios.create({
  baseURL: `http://localhost:8000/api`,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { api, cacheApi };
