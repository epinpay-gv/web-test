"use client";

import { useEffect, useState } from "react";

import { getApplications } from "../service/application.service";
import { ApplicationRecord } from "../types/application.type";

export function useApplications() {
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getApplications()
      .then((res) => setApplications(res.data))
      .catch(() => setError("Başvurular yüklenemedi."))
      .finally(() => setIsLoading(false));
  }, []);

  return { applications, isLoading, error };
}