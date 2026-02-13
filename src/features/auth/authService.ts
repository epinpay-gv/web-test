import { RegisterFormData, AuthResponse } from './auth.types';

const BASE_URL = "/api/auth";

export const authService = {
  // Kayıt Başlat (OTP Gönder)
  async initiateRegister(data: RegisterFormData): Promise<AuthResponse> {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, action: 'initiate' }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message);
    return result;
  },

  // OTP Doğrula ve Kaydı Bitir
  async verifyOtp(email: string, otpCode: string): Promise<AuthResponse> {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otpCode, action: 'verify' }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message);
    return result;
  },

  // Login
  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message);
    return result;
  }
};