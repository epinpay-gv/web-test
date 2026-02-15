export interface User {
  id?: string;
  email: string;
  name?: string;
  surname?: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  passwordAgain: string;
  name?: string;
  surname?: string;
  referal?: string;
  rememberMe?: boolean; 
}

export interface LoginFormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
}

export interface ValidationRules {
  minLength: boolean;
  hasNumber: boolean;
  hasLowerCase: boolean;
  hasUpperCase: boolean;
  hasSymbol: boolean;
}

export type AuthStep = 'form' | 'otp';