export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  referralCode: string;
  isEmailVerified: boolean;
};

export type UserProfileSectionContent = {
  title: string;
  description: string;
};

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
