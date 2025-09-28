import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosRequestConfig } from "axios";

interface ErrorResponse {
  message: string;
  status: number;
}

interface RequestParams {
  [key: string]: string | number | boolean | null | undefined;
}

// RequestData를 더 유연하게 수정
type RequestData = Record<string, unknown> | unknown;

class HttpClient {
  private instance: AxiosInstance;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || "") {
    this.instance = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json"
      }
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // You can add auth token here
        const token = localStorage.getItem("token");
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        // 서버에서 보낸 실제 에러 메시지 추출
        const responseData = error.response?.data as Record<string, unknown>;
        const serverMessage = responseData?.message || responseData?.error || responseData;

        const errorResponse: ErrorResponse = {
          message:
            typeof serverMessage === "string" ? serverMessage : error.message || "알 수 없는 에러가 발생했습니다.",
          status: error.response?.status || 500
        };
        return Promise.reject(errorResponse);
      }
    );
  }

  async get<T>(url: string, params?: RequestParams, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance.get(url, {
        params,
        ...config
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T>(url: string, data?: RequestData, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance.post(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T>(url: string, data?: RequestData): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance.put(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance.delete(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): ErrorResponse {
    if (error && typeof error === "object" && "status" in error) {
      return error as ErrorResponse;
    }
    const axiosError = error as AxiosError;
    return {
      message: axiosError.message || "알 수 없는 에러가 발생했습니다.",
      status: axiosError.response?.status || 500
    };
  }
}

// Create and export a default instance
const httpClient = new HttpClient();
export default httpClient;

// Export the class for custom instances
export { HttpClient };
