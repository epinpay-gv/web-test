import { mockProfile, mockProfileSectionContent } from "@/mocks/user/profile.mock";
import UserPageHeader from "@/features/user/components/common/UserPageHeader";
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
