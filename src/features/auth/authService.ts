import { baseFetcher } from '@/lib/api/baseFetcher';
import {
  RegisterFormData,
  AuthResponse,
  VerifyOtpRequest,
  LoginFormData,
  ForgotPasswordFormData,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  UserProfile,
} from './auth.types';

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider, 
  signInWithPopup, 
  UserCredential,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  confirmPasswordReset as firebaseConfirmPasswordReset,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

const BASE_URL = '/api/auth';

export const authService = {

  /* =======================================
                    REGISTER
     ======================================= */

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

  /* =======================================
                  LOGIN
     ======================================= */

  async login(credentials: LoginFormData): Promise<AuthResponse> {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    const firebaseToken = await userCredential.user.getIdToken();
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

  /* =======================================
                FORGOT PASSWORD
     ======================================= */

  async sendPasswordResetEmail(
    data: ForgotPasswordFormData,
    locale: string = 'tr'
  ): Promise<ForgotPasswordResponse> {
    const appUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

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

  /* =======================================
                RESET PASSWORD
    ======================================= */

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

  /* =======================================
              GOOGLE LOGIN             
    ======================================= */
    async loginWithGoogle(): Promise<AuthResponse> {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result: UserCredential = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      const user: UserProfile = {
        uid: result.user.uid,
        email: result.user.email || '',
        displayName: result.user.displayName || '',
        role: 'user', 
        epPoints: 0,
        balance: 0,
        id: result.user.uid
      };

      return {
        success: true,
        user,
        token,
        refreshToken: result.user.refreshToken,
        message: 'Google ile giriş başarılı.'
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "GOOGLE_AUTH_ERROR";
      throw new Error(errorMessage);
    }
  },
};