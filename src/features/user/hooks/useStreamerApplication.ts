"use client";

import { useEffect, useState } from "react";
import { ApplicationRecord } from "@/features/streamers/streamers.types";
import { getStreamerApplications } from "@/features/user/user.service";

export function useStreamerApplication() {
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStreamerApplications()
      .then((res) => setApplications(res.data))
      .catch(() => setError("Başvurular yüklenemedi."))
      .finally(() => setIsLoading(false));
  }, []);

  return { applications, isLoading, error };
}