"use client";
import { DetailHeaderData } from "@/features/user/user.types";
import { useState } from "react";
import HeaderDetail from "./HeaderDetail";
import HeaderStatus from "./HeaderStatus";
import HeaderTitle from "./HeaderTitle";

interface DetailPageHeaderProps {
  data: DetailHeaderData;
}

export default function DetailPageHeader({ data }: DetailPageHeaderProps) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="p-2 flex md:flex-row flex-col gap-3 md:gap-10">
      <div className="flex flex-col gap-1">
        <HeaderTitle data={data} copied={copied} setCopied={setCopied} />
        <HeaderDetail data={data} />
      </div>
      <HeaderStatus data={data} />
    </div>
  );
}
