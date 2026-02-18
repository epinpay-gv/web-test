// authService.ts

import { baseFetcher } from '@/lib/api/baseFetcher';
import {
  RegisterFormData,
  AuthResponse,
  VerifyOtpRequest,
  LoginFormData,
  ForgotPasswordFormData,
  ForgotPasswordResponse,
  ResetPasswordResponse,
} from './auth.types';

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  confirmPasswordReset as firebaseConfirmPasswordReset,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

const BASE_URL = '/api/auth';

export const authService = {

  // ── Register ───────────────────────────────────────────────────────────────

  async initiateRegister(data: RegisterFormData): Promise<AuthResponse> {
    return baseFetcher<AuthResponse, RegisterFormData>(
      `${BASE_URL}/register/initiate`,
      { method: 'POST', body: data },
      'Kayıt başlatılamadı'
    );
  },

  async verifyOtp(email: string, otpCode: string): Promise<AuthResponse> {
    return baseFetcher<AuthResponse, { email: string; otpCode: string }>(
      `${BASE_URL}/register/verify`,
      { method: 'POST', body: { email, otpCode } },
      'OTP doğrulama başarısız'
    );
  },

  async resendOtp(email: string): Promise<AuthResponse> {
    return baseFetcher<AuthResponse, { email: string }>(
      `${BASE_URL}/register/resend`,
      { method: 'POST', body: { email } },
      'OTP tekrar gönderilemedi'
    );
  },

  // ── Login ──────────────────────────────────────────────────────────────────

  /**
   * Firebase ile email/password login yapar, ardından backend'e token gönderir.
   * 
   * Akış:
   * 1. Firebase → signInWithEmailAndPassword → Firebase ID token al
   * 2. Backend mock → token ile kullanıcı datası + session token dön
   */
  async login(credentials: LoginFormData): Promise<AuthResponse> {
    // Step 1: Firebase'de email/password doğrulaması
    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );

    // Firebase ID token al
    const firebaseToken = await userCredential.user.getIdToken();

    // Step 2: Mock backend'e token gönder, kullanıcı datası + session token al
    // Gerçek projede bu endpoint token'ı verify eder, DB'den user datasını çeker
    const response = await baseFetcher<AuthResponse, { firebaseToken: string; email: string }>(
      `${BASE_URL}/login`,
      {
        method: 'POST',
        body: { firebaseToken, email: credentials.email },
      },
      'Backend login başarısız'
    );

    return response;
  },

  // ── Forgot Password ────────────────────────────────────────────────────────

  /**
   * Şifre sıfırlama e-postası gönderir.
   *
   * continueUrl: Kullanıcı maildeki linke tıklayınca Firebase oobCode'u
   * doğrular, ardından bu URL'e yönlendirir → bizim /reset-password sayfamız.
   */
  async sendPasswordResetEmail(
    data: ForgotPasswordFormData,
    locale: string = 'tr'
  ): Promise<ForgotPasswordResponse> {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

    auth.languageCode = locale;

    await firebaseSendPasswordResetEmail(auth, data.email, {
      url: `${appUrl}/reset-password`,
      handleCodeInApp: false,
    });

    return {
      success: true,
      message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.',
    };
  },

  // ── Reset Password ─────────────────────────────────────────────────────────

  /**
   * Yeni şifreyi kaydeder.
   */
  async confirmPasswordReset(
    oobCode: string,
    newPassword: string
  ): Promise<ResetPasswordResponse> {
    await firebaseConfirmPasswordReset(auth, oobCode, newPassword);

    return {
      success: true,
      message: 'Şifreniz başarıyla güncellendi.',
    };
  },
};