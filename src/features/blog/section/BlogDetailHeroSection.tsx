import { BlogDetail } from "../blog.types";

interface Props {
  data: BlogDetail;
}

export default function BlogDetailHeroSection({ data }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-(--text-heading) font-semibold text-[20px] lg:text-[32px]">
        {data.title}
      </h1>
      <p className="text-(--text-body) text-[14px] mt-2">
        {data.description}
      </p>
      <span className="text-(--text-body) text-[14px] mt-2 block">
        {data.publishedAt}
      </span>
    </div>
  );
}