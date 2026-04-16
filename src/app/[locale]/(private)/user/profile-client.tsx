"use client";
import UserProfileSection from "@/features/user/components/profile/UserProfileSection";
import { useUserMe } from "@/features/user/hooks/useUserMe";

const mockProfileSectionContent = {
  title: "Kişisel Bilgiler",
  description: "Kişisel bilgilerinizi buradan düzenleyebilirsiniz.",
};

export default function ProfileClient() {
  const { data, isLoading } = useUserMe();

  if (isLoading) return null; // TODO: skeleton
  if (!data) return null;

  return (
    <UserProfileSection
      user={{
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        email: data.email ?? "",
        referralCode: "",
        isEmailVerified: data.isIdentityVerified,
      }}
      content={mockProfileSectionContent}
    />
  );
}
