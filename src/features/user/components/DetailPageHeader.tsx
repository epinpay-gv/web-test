"use client";
import { useMemo, useState } from "react";
import { Button } from "@/components/common";
import { AngleLeft, FileCopy } from "flowbite-react-icons/outline";
import { CheckCircle } from "flowbite-react-icons/solid";
import Link from "next/link";
import { copyNumber } from "../utils/user.utils";
import { DetailHeaderData } from "@/features/user/user.types";

interface DetailPageHeaderProps {
  data: DetailHeaderData;
}

export default function DetailPageHeader({ data }: DetailPageHeaderProps){
  const [copied, setCopied] = useState(false);

  // ✅ No status logic here — already resolved by the adapter
  const { statusLabel, statusColor } = data;

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

  const copyButton = (
    <Button
      onClick={() => copyNumber(data.referenceNumber, setCopied)}
      icon={
        copied ? (
          <CheckCircle className="w-4 h-4 text-green-400" />
        ) : (
          <FileCopy className="w-4 h-4" />
        )
      }
      variant="secondary"
      appearance="outline"
      size="xs"
      padding="rounded"
      className="w-5.5 h-5.5 p-1 rounded-full border bg-(--bg-neutral-secondary-medium) text-(--text-body) border-(--border-default-medium)"
      title={copied ? "Kopyalandı!" : "Kopyala"}
    />
  );

  const metaInfo = (
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

  const statusAndTotal = (
    <div className="grid grid-cols-[auto_auto] gap-x-6 gap-y-1 text-sm">
      <span className="text-(--text-body)">Durum:</span>
      <span className={`font-medium ${statusColor}`}>{statusLabel}</span>

      {data.totalAmount && data.totalLabel && (
        <>
          <span className="text-(--text-body)">{data.totalLabel}:</span>
          <span className="font-semibold text-(--text-white)">
            {data.currency}{data.totalAmount}
          </span>
        </>
      )}
    </div>
  );

  const backButton = (
    <Link href={data.backHref}>
      <Button
        icon={<AngleLeft className="text-(--text-body) w-4 h-4" />}
        size="xs"
        variant="dark"
        padding="rounded"
        className="rounded-xl bg-(--bg-neutral-secondary-medium) border border-(--border-default-medium)"
      />
    </Link>
  );

  const referenceBlock = (
    <div className="flex items-center gap-1.5">
      <span className="text-[16px] font-semibold text-(--text-white) whitespace-nowrap">
        {data.referenceLabel}: {data.referenceNumber}
      </span>
      {copyButton}
    </div>
  );

  return (
    <div className="rounded-2xl bg-(--bg-neutral-primary-soft) p-2 flex flex-col gap-3">

      {/* DESKTOP */}
      <div className="hidden sm:grid grid-cols-3 items-start">
        <div className="flex items-center gap-3">
          {backButton}
          {referenceBlock}
        </div>
        <div className="flex justify-center">{statusAndTotal}</div>
      </div>
      <div className="hidden sm:flex">{metaInfo}</div>

      {/* MOBİL */}
      <div className="flex sm:hidden flex-col gap-3">
        <div className="flex items-center gap-3">
          {backButton}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[16px] font-semibold text-(--text-white) truncate">
                {data.referenceLabel}: {data.referenceNumber}
              </span>
              {copyButton}
            </div>
          </div>
        </div>

        {metaInfo}

        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-(--text-body)">Durum</span>
            <span className={`font-medium ${statusColor}`}>{statusLabel}</span>
          </div>
          {data.totalAmount && data.totalLabel && (
            <div className="flex items-center justify-between">
              <span className="text-(--text-body)">{data.totalLabel}</span>
              <span className="font-semibold text-(--text-white)">
                {data.currency}{data.totalAmount}
              </span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};