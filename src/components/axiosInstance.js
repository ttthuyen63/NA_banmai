import axios from "axios";

const instance = axios.create();

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
