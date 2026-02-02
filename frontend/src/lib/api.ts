import axios, { AxiosError, AxiosInstance } from "axios";
import {
  ApiResponse,
  Content,
  LoginCredentials,
  SignupCredentials,
  AddContentData,
  User,
  ShareContent,
} from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }

  private handleError(error: AxiosError<{ message: string }>): never {
    const message = error.response?.data?.message || "An error occurred";
    throw new Error(message);
  }

  async login(credentials: LoginCredentials): Promise<ApiResponse<User>> {
    try {
      const response = await this.client.post<ApiResponse<User>>(
        "/auth/login",
        credentials
      );
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError<{ message: string }>);
    }
  }

  async signup(credentials: SignupCredentials): Promise<ApiResponse<User>> {
    try {
      const response = await this.client.post<ApiResponse<User>>(
        "/auth/signup",
        credentials
      );
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError<{ message: string }>);
    }
  }

  async logout(): Promise<ApiResponse<null>> {
    try {
      const response = await this.client.post<ApiResponse<null>>(
        "/auth/logout"
      );
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError<{ message: string }>);
    }
  }

  async refreshToken(): Promise<ApiResponse<null>> {
    try {
      const response = await this.client.post<ApiResponse<null>>(
        "/auth/refresh"
      );
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError<{ message: string }>);
    }
  }

  async getMe(): Promise<ApiResponse<User>> {
    try {
      const response = await this.client.get<ApiResponse<User>>("/auth/me");
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError<{ message: string }>);
    }
  }

  async getContents(): Promise<ApiResponse<{ contents: Content[] }>> {
    try {
      const response = await this.client.get<
        ApiResponse<{ contents: Content[] }>
      >("/api/v1/content");
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError<{ message: string }>);
    }
  }

  async addContent(data: AddContentData): Promise<ApiResponse<Content>> {
    try {
      const response = await this.client.post<ApiResponse<Content>>(
        "/api/v1/content",
        data
      );
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError<{ message: string }>);
    }
  }

  async deleteContent(id: number): Promise<ApiResponse<null>> {
    try {
      const response = await this.client.delete<ApiResponse<null>>(
        "/api/v1/content",
        { data: { contId: id } }
      );
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError<{ message: string }>);
    }
  }

  async createShareLink(id: number): Promise<ApiResponse<Content>> {
    try {
      const response = await this.client.post<ApiResponse<Content>>(
        `/api/v1/brain/share/${id}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError<{ message: string }>);
    }
  }

  async getSharedContent(linkId: string): Promise<ApiResponse<ShareContent>> {
    try {
      const response = await this.client.get<ApiResponse<ShareContent>>(
        `/api/v1/brain/share/${linkId}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError<{ message: string }>);
    }
  }
}

export const apiClient = new ApiClient();
