export interface RegisterFormData {
  email: string;
  password: string;
  passwordAgain: string;
  rememberMe: boolean;
  name?: string;
  surname?: string;
  referal?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  refreshToken: string;
  expiresIn?: number; 
  user?: UserProfile;
}

export interface UserProfile {
  role: string;
  displayName: string;
  uid: string;
  epPoints: number;
  balance: number;
  id: string;
  email: string;
  name?: string;
  surname?: string;
}

export interface VerifyOtpRequest {
  email: string;
  otpCode: string;
}

export interface ValidationRules {
  minLength: boolean;
  hasNumber: boolean;
  hasLowerCase: boolean;
  hasUpperCase: boolean;
  hasSymbol: boolean;
}

export interface FirebaseTokenResponse {
  success: boolean;
  firebaseToken: string;
  expiresIn?: number;
}

export interface LoginWithFirebaseRequest {
  firebaseToken: string;
}

export type RegisterStep = 'form' | 'otp';

export type LoginFormState = LoginFormData;

export interface ForgotPasswordFormData {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export type AuthView = 'login' | 'forgot-password';

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export type ResetPasswordView = 'form' | 'success' | 'invalid-link';

