"use client";

import { useState } from "react";
import { BlogCard, BlogListPageData } from "../blog.types";
import BlogGridCard from "../cards/BlogGridCard";
import { PaginationData } from "@/types/types";
import { Pagination } from "@/components/common";

interface Props {
  data: BlogCard[];
  pagination: PaginationData;
}

export default function AllBlogSection({ data, pagination }: Props) {
  const [currentPage, setCurrentPage] = useState(pagination.current_page);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-(--text-heading) font-semibold text-[20px] mb-6">
        Tüm Yazılar
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
        {data.map((item) => (
          <BlogGridCard key={item.id} data={item} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Pagination
          pagination={{ ...pagination, current_page: currentPage }}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>
    </div>
  );
}