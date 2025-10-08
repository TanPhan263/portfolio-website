import axios, {
  AxiosError,
  AxiosRequestConfig,
  type AxiosHeaders,
  type AxiosInstance
} from 'axios';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false // ⛔ bỏ qua kiểm tra chứng chỉ
});

export class BaseService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL?: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL || process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      ...(process.env.NODE_ENV === 'development'
        ? {
            httpsAgent: agent
          }
        : {})
    });

    this.axiosInstance.interceptors.request.use(
      async (config) => {
        config.headers = { ...(config.headers ?? {}) } as AxiosHeaders;

        // Handle Authen
        // const accessToken = AuthService.token;
        // if (accessToken && !config.headers['Is-Ignore-Auth']) {
        //   config.headers['Authorization'] = `Bearer ${accessToken}`;
        // } else {
        //   delete config.headers['Authorization'];
        // }

        // delete config.headers['Is-Ignore-Auth'];
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      async (response) => response,
      (error: AxiosError) => {
        if (error.status === 401 || error.status === 403) {
          // Handle logout
          return Promise.reject('Unauthorized');
        }
        return Promise.reject(error.response?.data || error);
      }
    );
  }

  public get = async <TRequest, TResponse>(
    path: string,
    params?: TRequest,
    config?: AxiosRequestConfig
  ) => {
    const res = await this.axiosInstance.get(path, { params, ...config });
    return res.data as TResponse;
  };

  public post = async <TRequest, TResponse>(
    path: string,
    data?: TRequest,
    config?: AxiosRequestConfig
  ) => {
    const res = await this.axiosInstance.post(path, data, config);
    return res.data as TResponse;
  };

  public put = async <TRequest, TResponse>(
    path: string,
    data?: TRequest,
    config?: AxiosRequestConfig
  ) => {
    const res = await this.axiosInstance.put(path, data, config);
    return res.data as TResponse;
  };

  public patch = async <TRequest, TResponse>(
    path: string,
    data?: TRequest,
    config?: AxiosRequestConfig
  ) => {
    const res = await this.axiosInstance.patch(path, data, config);
    return res.data as TResponse;
  };

  public delete = async <TRequest, TResponse>(
    path: string,
    params?: TRequest,
    config?: AxiosRequestConfig
  ) => {
    const res = await this.axiosInstance.delete(path, { params, ...config });
    return res.data as TResponse;
  };
}
