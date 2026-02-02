"use client";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import Link from "next/link";

interface TitleProps {
  data: {
    title: string;
    secondaryTitle?: string;
    actionLink?: string;
    actionLinkText?: string;
    isBreadcrumb?: boolean;
  };
}

export default function Title({ data }: TitleProps) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xl flex items-center gap-2">
            <h1>{data.title}</h1>
            <p className="text-body text-[14px] my-0">{data.secondaryTitle}</p>
          </span>
          {data.actionLink && (
            <Link className="text-sm text-(--text-fg-brand)" href={data.actionLink}>{data.actionLinkText}</Link>
          )}
        </div>
        {data.isBreadcrumb && (
          <Breadcrumb
            data={{
              currentPage: "Ürünler",
              currentPageLink: "/products",
            }}
          />
        )}
      </div>
    </>
  );
}
