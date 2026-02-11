/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseFetcher } from "@/lib/api/baseFetcher";
import { LoginCredentials, UserProfile } from "./auth.types";

export const authService = {
  async fullLogin(credentials: LoginCredentials) {
    return await baseFetcher<{
      data: any; user: UserProfile; token: string 
}, LoginCredentials>(
      "/api/auth/login",
      {
        method: "POST",
        body: credentials,
      },
      "Giriş başarısız."
    );
  }
};