import UserPageHeader from "@/features/user/components/common/UserPageHeader";
import ProfileClient from "./profile-client";

export default function User() {
  return (
    <div>
      <UserPageHeader title="Kullanıcı Bilgilerim" />
      <ProfileClient />
    </div>
  );
}
