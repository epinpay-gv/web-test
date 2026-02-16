import { baseFetcher } from '@/lib/api/baseFetcher';
import { 
  RegisterFormData, 
  AuthResponse, 
  VerifyOtpRequest,
  FirebaseTokenResponse,
  LoginWithFirebaseRequest,
  LoginFormData
} from './auth.types';

const BASE_URL = "/api/auth";

export const authService = {
  /**
   * Kayıt Başlat (OTP Gönder)
   */
  async initiateRegister(data: RegisterFormData): Promise<AuthResponse> {
    return baseFetcher<AuthResponse, RegisterFormData>(
      `${BASE_URL}/register/initiate`,
      {
        method: 'POST',
        body: data,
      },
      'Kayıt başlatılamadı'
    );
  },

  /**
   * OTP Doğrula ve Kaydı Bitir
   */
  async verifyOtp(email: string, otpCode: string): Promise<AuthResponse> {
    return baseFetcher<AuthResponse, VerifyOtpRequest>(
      `${BASE_URL}/register/verify`,
      {
        method: 'POST',
        body: { email, otpCode },
      },
      'OTP doğrulama başarısız'
    );
  },

  /**
   * Tekrar OTP Gönder
   */
  async resendOtp(email: string): Promise<AuthResponse> {
    return baseFetcher<AuthResponse, { email: string }>(
      `${BASE_URL}/register/resend`,
      {
        method: 'POST',
        body: { email },
      },
      'OTP tekrar gönderilemedi'
    );
  },

  /**
   * Firebase Token Al (1. Adım)
   */
  async getFirebaseToken(credentials: LoginFormData): Promise<FirebaseTokenResponse> {
    return baseFetcher<FirebaseTokenResponse, LoginFormData>(
      `${BASE_URL}/login/firebase-token`,
      {
        method: 'POST',
        body: credentials,
      },
      'Firebase token alınamadı'
    );
  },

  /**
   * Firebase Token ile Backend Login (2. Adım)
   */
  async loginWithFirebaseToken(firebaseToken: string): Promise<AuthResponse> {
    return baseFetcher<AuthResponse, LoginWithFirebaseRequest>(
      `${BASE_URL}/login`,
      {
        method: 'POST',
        body: { firebaseToken },
      },
      'Giriş başarısız'
    );
  }
};