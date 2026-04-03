import { IconShape } from "@/components/common";
import { DetailHeaderData } from "@/features/user/user.types";
import { copyNumber } from "@/features/user/utils/user.utils";
import { AngleLeft, Check, FileCopy } from "flowbite-react-icons/outline";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface HeaderTitleProps {
  data: DetailHeaderData;
  copied: boolean;
  setCopied: Dispatch<SetStateAction<boolean>>;
}

export default function HeaderTitle({
  data,
  copied,
  setCopied,
}: HeaderTitleProps) {
  return (
    <div className="flex items-center gap-3 ">
      {/* Back Button */}
      <Link href={data.backHref}>
        <IconShape icon={AngleLeft} variant="square" color="secondary" />
      </Link>

      {/* Number/Info */}
      <span className="font-semibold text-(--text-white)">
        {data.referenceLabel}: {data.referenceNumber}
      </span>

      {/* Copy Button */}
      <IconShape
        icon={copied ? Check : FileCopy}
        variant="circle"
        color={copied ? "green" : "secondary"}
        onClick={() => copyNumber(data.referenceNumber, setCopied)}
      />
    </div>
  );
}
