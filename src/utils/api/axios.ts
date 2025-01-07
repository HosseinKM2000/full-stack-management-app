import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  //   HttpStatusCode,
} from "axios";

export const api = axios.create({
  baseURL: process.env.API_URL,
  headers: { "Content-Type": "application/json" },
});

/**
 * Global api interceptor
 * @param {InternalAxiosRequestConfig} request
 */

const apiInterceptor = async (request: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
};

const errorInterceptor = async (axiosError: AxiosError) => {
  // if(axiosError.response?.status === HttpStatusCode.Unauthorized ) {
  //     Router.push({pathname:"/auth/signin"})
  //     return Promise.reject(axiosError);
  // }
  return Promise.reject(axiosError);
};

// Request Interceptors
api.interceptors.request.use(apiInterceptor);

// Response Interceptors
api.interceptors.response.use((res) => res, errorInterceptor);
