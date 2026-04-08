"use client";

import { useApplications } from "../hooks/useApplications";
import ApplicationCardBase from "./ApplicationCardBase";

export default function ApplicationCard() {
  const { applications, isLoading, error } = useApplications();

  if (isLoading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="font-semibold text-[16px]">Başvurular</h1>
      <p className="text-(--text-body) text-[14px]">
        Yayıncı başvurularınızı buradan takip edebilirsiniz.
      </p>
      <div className="flex flex-wrap gap-4">
        {applications.map((app) => (
          <ApplicationCardBase key={app.applicationId} application={app} />
        ))}
      </div>
    </div>
  );
}