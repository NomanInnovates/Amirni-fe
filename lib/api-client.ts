import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
}

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string = API_BASE_URL) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  private async request<T>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(endpoint, config);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const message =
        error instanceof axios.AxiosError
          ? error.response?.data?.error || error.message || "Failed to fetch"
          : error instanceof Error
            ? error.message
            : "Unknown error";

      return {
        success: false,
        error: message,
        statusCode:
          error instanceof axios.AxiosError ? error.response?.status || 0 : 0,
      };
    }
  }

  public get<T = unknown>(endpoint: string, config?: AxiosRequestConfig) {
    return this.request<T>(endpoint, config);
  }

  public async post<T = unknown>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.post<T>(endpoint, data, config);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const message =
        error instanceof axios.AxiosError
          ? error.response?.data?.error || error.message || "Failed to create"
          : error instanceof Error
            ? error.message
            : "Unknown error";

      return {
        success: false,
        error: message,
        statusCode:
          error instanceof axios.AxiosError ? error.response?.status || 0 : 0,
      };
    }
  }

  public async put<T = unknown>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.put<T>(endpoint, data, config);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const message =
        error instanceof axios.AxiosError
          ? error.response?.data?.error || error.message || "Failed to update"
          : error instanceof Error
            ? error.message
            : "Unknown error";

      return {
        success: false,
        error: message,
        statusCode:
          error instanceof axios.AxiosError ? error.response?.status || 0 : 0,
      };
    }
  }

  public async delete<T = unknown>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<T>(endpoint, config);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const message =
        error instanceof axios.AxiosError
          ? error.response?.data?.error || error.message || "Failed to delete"
          : error instanceof Error
            ? error.message
            : "Unknown error";

      return {
        success: false,
        error: message,
        statusCode:
          error instanceof axios.AxiosError ? error.response?.status || 0 : 0,
      };
    }
  }
}

const apiClient = new ApiClient();

export const useApi = <T = unknown>(
  endpoint: string,
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">,
) => {
  return useQuery<T>({
    queryKey: [endpoint],
    queryFn: async () => {
      const response = await apiClient.get<T>(endpoint);
      if (!response.success) {
        throw new Error(response.error || "Failed to fetch");
      }
      return response.data as T;
    },
    ...options,
  });
};

export default apiClient;
