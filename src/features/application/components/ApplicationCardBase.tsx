import { ApplicationRecord, ApplicationStatus } from "../types/application.type";


const STATUS_MAP: Record<ApplicationStatus, { label: string; className: string }> = {
  PENDING:            { label: "Beklemede",         className: "text-(--text-fg-warning)" },
  UNDER_REVIEW:       { label: "Değerlendiriliyor", className: "text-(--text-fg-warning)" },
  APPROVED:           { label: "Onaylandı",         className: "text-(--text-fg-success)" },
  REJECTED:           { label: "Reddedildi",        className: "text-(--text-fg-danger-strong)" },
  REVISION_REQUESTED: { label: "Revizyon İstendi",  className: "text-(--text-fg-warning)" },
};

export default function ApplicationCardBase({ application }: { application: ApplicationRecord }) {
  const status = STATUS_MAP[application.status];

  return (
    <div className="bg-(--bg-neutral-primary-soft) border border-(--border-default) rounded-2xl w-[320px] p-4 flex flex-col gap-1 mt-4">

      <div className="flex items-center justify-between">
        <span className="text-[16px] font-semibold truncate">Başvuru ID: {application.applicationId}</span>
      </div>

      <div className="flex flex-col gap-0.5">
        <p className="text-(--text-heading) text-sm font-semibold">{application.fullName}</p>
      </div>

   <div className="flex items-center text-xs text-(--text-body)">
  <span className="pr-2">{new Date(application.createdAt).toLocaleDateString("tr-TR")}</span>
  <span>{application.email}</span>
</div>


      <div className="flex items-center gap-1.5 py-3 text-xs text-(--text-body)">
        <span>Başvuru Durumu:</span>
        <span className={`font-semibold ${status.className}`}>
          {status.label}
        </span>
      </div>

    </div>
  );
}

