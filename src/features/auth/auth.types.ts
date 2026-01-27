export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
}

export interface ApiUser {
  id: string;
  name: string;
  avatar: string;
  email: string;
  password: string;
  token: boolean;
}
