import { ApplicationRecord } from "@/features/application/types/application.type";

export const mockStreamerApplications: ApplicationRecord[] = [
  {
    applicationId: "1234567890",
    fullName: "Burak Yılmaz",
    email: "burak@gmail.com",
    createdAt: "2026-04-01T10:00:00",
    status: "PENDING",
  },
  {
    applicationId: "0987654321",
    fullName: "Burak Yılmaz",
    email: "burak@gmail.com",
    createdAt: "2026-04-01T10:00:00",
    status: "REJECTED",
  },
];