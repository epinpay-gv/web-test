// blog liste kartı 
export interface BlogListItem {
    id: string;
    slug: string;
    title: string;
    description: string;
    coverImage: string;
    createdAt: string;
    viewCount: number;
}

// blog detay sayfası için
export interface BlogDetail {
    id: string;
    slug: string;
    title: string;
    coverImage: string;
    createAt: string;
    content: string;
}

export interface PaginatedBlogResponse { 
    data: BlogListItem[]; 
    total: number; 
    page: number; 
    pageSize: number; }