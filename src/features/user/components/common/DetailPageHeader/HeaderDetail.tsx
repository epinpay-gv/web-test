
import { DetailHeaderData } from "@/features/user/user.types";
import { useMemo } from "react";

interface HeaderDetailProps {
  data: DetailHeaderData;
}

export default function HeaderDetail({ data }: HeaderDetailProps) {
  const { formattedDate, formattedTime } = useMemo(() => {
    const date = new Date(data.createdAt);
    return {
      formattedDate: date.toLocaleDateString("tr-TR"),
      formattedTime: date.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }, [data.createdAt]);
  return (
    <div className="flex items-center gap-2 text-sm text-(--text-body)">
      {data.metaItems.map((item, i) => (
        <span
          key={i}
          className={
            i < data.metaItems.length - 1
              ? "border-r border-(--border-neutral) pr-2"
              : ""
          }
        >
          {item}
        </span>
      ))}
      <span className="border-l border-(--border-neutral) pl-2">
        {formattedDate} {formattedTime}
      </span>
    </div>
  );
}
