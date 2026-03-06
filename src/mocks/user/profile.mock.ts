import { UserProfile, UserProfileSectionContent } from "@/features/user/user.types";

export const mockProfile: UserProfile = {
  firstName: "Burak",
  lastName: "Altun",
  email: "burak@epinpay.com",
  referralCode: "F67305",
  isEmailVerified: false,
};

export const mockProfileSectionContent: UserProfileSectionContent = {
  title: "Kişisel Bilgiler",
  description: "Kişisel bilgilerinizi buradan düzenleyebilirsiniz.",
};