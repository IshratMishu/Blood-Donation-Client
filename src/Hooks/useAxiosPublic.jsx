import axios from "axios";
import { API } from "../utils/config";

const axiosPublic = axios.create({
  baseURL: API,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
