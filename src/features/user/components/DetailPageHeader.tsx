"use client";
import { SetStateAction, useMemo, useState } from "react";
import { Button } from "@/components/common";
import { AngleLeft, FileCopy } from "flowbite-react-icons/outline";
import { CheckCircle } from "flowbite-react-icons/solid";
import Link from "next/link";
import { copyNumber } from "../utils/user.utils";
import { DetailHeaderData } from "@/features/user/user.types";
import HeaderTitle from "./DetailPageHeader/HeaderTitle";
import HeaderDetail from "./DetailPageHeader/HeaderDetail";
import HeaderStatus from "./DetailPageHeader/HeaderStatus";

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
