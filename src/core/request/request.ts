import axios from "axios";
import config from "../utils/config.ts";

const request = axios.create({
  baseURL: `${config.API_ROOT}`,
});

request.interceptors.request.use(
  (config) => {
    try {
      console.log(config);
    } catch (err) {
      console.log(err);
    }

    return config;
  },
  (error) => {
    console.log(error);
  },
);

request.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export { request };
