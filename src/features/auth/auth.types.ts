export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  surname?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginError {
  email?: string;
  password?: string;
  form?: string;
}