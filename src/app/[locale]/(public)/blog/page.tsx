// useBlogMeta() kullanılmış

import BlogAllSection from "@/features/blog/components/BlogAllSection";
import BlogHeroSection from "@/features/blog/components/BlogHeroSection";
import BlogPopularSection from "@/features/blog/components/BlogPopularSection";

export default function BlogPage() {
    return(
        <div className="py-12">
            <BlogHeroSection />
            <BlogPopularSection />
            <BlogAllSection />
        </div>
    )
}
