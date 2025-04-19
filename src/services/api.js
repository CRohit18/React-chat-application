import axios from "axios";
import conf from "@/conf/conf";
import Cookies, { cookieKeys } from "./cookies";

const API_URL = `${conf.APIUrl}`;

class Axios {
  constructor(baseURL) {
    this.axios = axios.create({
      baseURL,
    });
    this.axios.interceptors.request.use(this._requestMiddleware);
    this.axios.interceptors.response.use(
      this._responseMiddleware,
      this._responseErr
    );
  }

  _requestMiddleware = (req) => {
    // Send Bearer token on every request
    const token = Cookies.get(cookieKeys?.TOKEN);
    if (token)
      req.headers.authorization = token.startsWith("Token")
        ? token
        : "Bearer " + token;
    return req;
  };

  _responseMiddleware = (response) => {
    if (response?.data?.access) {
      Cookies.set(cookieKeys?.TOKEN, response.data?.access);
    }
    if (response?.data?.refresh) {
      Cookies.set(
        cookieKeys?.REFRESH_TOKEN,
        response?.data?.refresh
      );
    }
    return response;
  };

  _responseErr = (error) => {
    return Promise.reject(error);
  };
}

const axiosReact = new Axios(API_URL).axios;
export { axiosReact };
