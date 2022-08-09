import axios from "axios";
import { CLOVER_TOKEN, CLOVER_USER } from "constants/";

// Set up default config for http requests here
const axiosService = axios.create({
  baseURL: '/api',
  headers: {
    "content-type": "application/json",
  },
});

axiosService.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 401:
        removeHeader('Authorization');
        localStorage.removeItem(CLOVER_USER);
        localStorage.removeItem(CLOVER_TOKEN);
        window.location.href = "/login";
        break;
      default:
        return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

const setHeader = (name, value) => {
  axiosService.defaults.headers.common[name] = value;
};

const removeHeader = (name) => {
  delete axiosService.defaults.headers.common[name];
};

export { axiosService, setHeader, removeHeader };
