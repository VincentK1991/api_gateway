import { createApiClient } from "./baseApiClient";
import type {
    RegisterRequest,
    RegisterResponse,
    LoginRequest,
    LoginResponse,
    RefreshTokenResponse,
    User
} from "@/types/User";

const authApiClient = createApiClient("/api/auth");

export const signUp = async (request: RegisterRequest): Promise<RegisterResponse> => {
    const response = await authApiClient.post<RegisterResponse>("/signup", request);
    return response.data;
};

export const login = async (request: LoginRequest): Promise<LoginResponse> => {
    const response = await authApiClient.post<LoginResponse>("/login", request);
    return response.data;
};

export const refresh = async (): Promise<RefreshTokenResponse> => {
    const response = await authApiClient.post<RefreshTokenResponse>("/refresh");
    return response.data;
};

export const logOut = async (): Promise<void> => {
    await authApiClient.post("/logout");
};

export const getCurrentUser = async (): Promise<User> => {
    const response = await authApiClient.get<User>("/me");
    return response.data;
};
