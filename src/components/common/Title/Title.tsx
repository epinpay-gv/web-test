"use client";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import Link from "next/link";
import { TitleData } from "./types";

interface TitleProps {
  data: TitleData;
}

export default function Title({ data }: TitleProps) {
  return (
    <>
      <div className={`flex flex-col gap-4 ${
        data.isUnderlined ? "border-b border-border-default pb-3" : ""
      }`}>
        <div className="flex items-center justify-between">
          <span className="text-xl flex items-center gap-2">
            <h1 className={data.titleColor ? data.titleColor : "white"}>{data.title}</h1>
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
