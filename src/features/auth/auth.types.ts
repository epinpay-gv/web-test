// Firebase REST API yanıtı için
export interface FirebaseSignInResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

// Formdan gelen veriler için
export interface LoginCredentials {
  email: string;
  password: string;
}

// Backend login yanıtındaki kullanıcı verisi
export interface LoginData {
  user: {
    id: string;
    email: string;
    phone: string | null;
    roles: string[];
    isIdentityVerified: boolean;
  };
  token?: string;
}

// Profil servisinden gelen detaylı veriler (Zustand için)
export interface UserProfile {
  id: string;
  email: string;
  phone: string | null;
  roles: string[];
  isIdentityVerified: boolean;
  name: string;
  surname: string;
  balance: number;
  epPoints: number;
}

// Genel API yanıt yapısı
export interface AuthResponse {
  success: boolean;
  message: string;
  data: LoginData;
}