import { baseFetcher } from "@/lib/api/baseFetcher"; // api geldiğinde bağlanacak
import { AuthResponse, LoginCredentials } from "./auth.types";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Gerçek API kullanımında:
    // return baseFetcher<AuthResponse, LoginCredentials>("/auth/login", { 
    //   method: "POST", 
    //   body: credentials 
    // });

    // MOCK SİMÜLASYONU (Tip güvenli Promise)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === "test@mail.com" && credentials.password === "123456") {
          resolve({
            user: { id: "1", name: "Ahmet", surname:"Yılmaz", email: "test@mail.com" },
            token: "mock-jwt-token",
          });
        } else {
          reject({ status: 401, message: "E-posta veya şifre hatalı!" });
        }
      }, 1000);
    });
  },
};