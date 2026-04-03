import { useAuthStore } from "../store/auth.store";

export function useUserProfile() {
  const { user, updateUser } = useAuthStore();

  async function syncProfile() {
    const res = await fetch("/api/users/user-profile");
    if (!res.ok) return;
    const data = await res.json();
    
    updateUser({
      balance: data.balance,
      epPoints: data.epPoints,
    });
  }

  return { user, syncProfile };
}