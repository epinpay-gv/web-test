import { ApplicationRecord } from "@/features/streamers/streamers.types";

export const mockStreamerApplications: ApplicationRecord[] = [
  {
    applicationId: "1234567890",
    fullName: "Burak Yılmaz",
    email: "burak@gmail.com",
    createdAt: "2026-04-01T10:00:00",
    status: "pending",
  },
    {
    applicationId: "1234567890",
    fullName: "Burak Yılmaz",
    email: "burak@gmail.com",
    createdAt: "2026-04-01T10:00:00",
    status: "rejected",
  },
];