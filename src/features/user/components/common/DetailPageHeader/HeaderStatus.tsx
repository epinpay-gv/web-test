import { DetailHeaderData } from "@/features/user/user.types";

interface HeaderStatusProps {
  data: DetailHeaderData;
}

export default function HeaderStatus({ data }: HeaderStatusProps) {
  const { statusLabel, statusColor } = data;
  
  return (
    <div className="grid grid-cols-[auto_auto] gap-x-6 gap-y-1 text-sm">
      <span className="text-(--text-body)">Durum:</span>
      <span className={`font-medium ${statusColor}`}>{statusLabel}</span>

      {data.totalAmount && data.totalLabel && (
        <>
          <span className="text-(--text-body)">{data.totalLabel}:</span>
          <span className="font-semibold text-(--text-white)">
            {data.currency}
            {data.totalAmount}
          </span>
        </>
      )}
    </div>
  );
}
