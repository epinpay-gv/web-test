import { baseFetcher } from "@/lib/api/baseFetcher";
import { ApiUser, LoginRequest, LoginResponse } from "@/features/auth/auth.types";

const BASE_URL = "https://67a5e262510789ef0df999e2.mockapi.io/api/v1/users";

export async function loginFetcher(
  payload: LoginRequest
): Promise<LoginResponse> {
  // 1️⃣ Tüm kullanıcıları çek
  const users = await baseFetcher<ApiUser[]>(`${BASE_URL}`, {
    method: "GET",
    cache: "no-store",
  });

  // 2️⃣ Email + password eşleşmesi
  const matchedUser = users.find(
    (user) =>
      user.email === payload.email &&
      user.password === payload.password
  );

  if (!matchedUser) {
    throw {
      status: 401,
      message: "E-posta veya şifre hatalı",
    };
  }

  // 3️⃣ App User’a map et (password asla dönmez)
  return {
    user: {
      id: matchedUser.id,
      name: matchedUser.name,
      avatar: matchedUser.avatar,
      email: matchedUser.email,
    },
  };
}
