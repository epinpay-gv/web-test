import { mockProfile, mockProfileSectionContent } from "@/features/user/mocks/profile.mock";
import UserPageHeader from "@/features/user/components/UserPageHeader";
import UserProfileSection from "@/features/user/components/profile/UserProfileSection";

export default function User() {
  return (
    <div>
      <UserPageHeader title="Kullanıcı Bilgilerim" />

      <UserProfileSection
        user={mockProfile}
        content={mockProfileSectionContent}
      />
    </div>
  );
}
