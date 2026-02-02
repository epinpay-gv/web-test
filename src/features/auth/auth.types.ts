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