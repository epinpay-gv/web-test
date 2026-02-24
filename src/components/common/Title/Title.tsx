import Link from "next/link";
import { TitleData } from "./types";

interface TitleProps {
  data: TitleData;
  activeCount?: number;
  actionBtn?: boolean;
  onAction?: () => void;
}

export default function Title({
  data,
  activeCount = 0,
  actionBtn,
  onAction,
}: TitleProps) {
  return (
    <>
      <div className="flex items-center w-full justify-between md:border-b border-(--border-default)">
        <span className="text-xl flex items-center gap-2">
          <h2 className={data.titleColor ? data.titleColor : "white"}>
            {data.title}
          </h2>
          {activeCount > 0 && (
            <span className="text-(--text-body)">({activeCount})</span>
          )}
          <p className="text-body text-[14px] my-0">{data.secondaryTitle}</p>
        </span>
        {data.actionLink && (
          <Link
            className="text-sm text-(--text-fg-brand)"
            href={data.actionLink}
          >
            {data.actionLinkText}
          </Link>
        )}
        {actionBtn && activeCount > 0 && (
          <button
            onClick={onAction}
            className="text-(--text-fg-brand) mr-2 cursor-pointer hover:underline"
          >
            Temizle
          </button>
        )}
      </div>
    </>
  );
}
