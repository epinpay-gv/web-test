import {
  BlogListItem,
  BlogDetail,
  PaginatedBlogResponse,
} from "@/features/blog/types";

import { mockBlogs } from "@/mocks/blog.mock";

/**
 * Paginated blog listesi döner
 */
export const getBlogs = async (
  page: number,
  pageSize: number
): Promise<PaginatedBlogResponse> => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const paginatedData = mockBlogs.slice(start, end);

  return {
    data: paginatedData,
    total: mockBlogs.length,
    page,
    pageSize,
  };
};

/**
 * En çok okunan blogları döner
 */
export const getPopularBlogs = async (
  limit: number = 5
): Promise<BlogListItem[]> => {
  const sorted = [...mockBlogs].sort(
    (a, b) => b.viewCount - a.viewCount
  );

  return sorted.slice(0, limit);
};

/**
 * Slug ile blog detayını döner
 */
// export const getBlogBySlug = async (
//   slug: string
// ): Promise<BlogDetail | null> => {
//   return mockBlogDetails[slug] ?? null;
// };
