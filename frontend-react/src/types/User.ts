// Common types
export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface RegisterResponse {
  message: string;
  userId: string;
  email: string;
}

export interface RefreshTokenResponse {
  message: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}
