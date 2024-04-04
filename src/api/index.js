import axios from "axios";
import store from "../store/store";
import { setError, setLoader } from "../store/slice/global.slice";


const instance = axios.create({
  baseURL: "https://dev.armeniansusa.com/en/api/v1/",
});


instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use((res) => res, (error) => {
    if (error.response.status === 422) {
      store.dispatch(setLoader(false));
      store.dispatch(setError(error.response.data.errors));
    }
    if (error.response.status === 401) {
      store.dispatch(setLoader(false));
      store.dispatch(setError(error.response.data.message));
    }
  }
);

export default instance;