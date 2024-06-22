import axios from "axios";
import useAuth from "./useAuth";
import { API } from "../utils/config";

const axiosSecure = axios.create({
  baseURL: API,
});

const useAxiosSecure = () => {
  const { logout, setLoading } = useAuth();

  // request interceptors to add  authorization header for  every secure call to the api
  axiosSecure.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      const token = localStorage.getItem("access-token");
      // console.log("token", token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // intercepts 401 and 403 status
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      console.log("status error interceptor", status);
      if (status === 401 || status === 403) {
        setLoading(false);
        await logout();
        return;
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
