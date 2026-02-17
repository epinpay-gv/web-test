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
  expiresIn?: number; // OTP süresi (saniye)
  user?: UserProfile;
}

export interface UserProfile {
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