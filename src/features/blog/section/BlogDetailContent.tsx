import { BlogDetail } from "../blog.types";

interface Props {
  data: BlogDetail;
}

export default function BlogDetailContentSection({ data }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-4 flex flex-col gap-8 bg-(--bg-neutral-primary-soft) p-6 border-(--border-default) rounded-[12px]">

      {data.sections.map((section, index) => (
        <div key={index} className="flex flex-col gap-4">

          {section.title && (
            <h2 className="text-(--text-heading) font-semibold text-[18px] lg:text-[20px]">
              {section.title}
            </h2>
          )}

          {section.content && (
              <div
    className="text-(--text-body) text-[14px] leading-[150%]"
    dangerouslySetInnerHTML={{ __html: section.content }}
  />
          )}

          {section.image && (
            <div className="relative">
              <img
                src={section.image}
                alt={section.title ?? ""}
                className="w-full h-[175px] lg:h-[360px] w-[720px] object-cover rounded-2xl"
              />

            </div>
          )}

        </div>
      ))}

    </div>
  );
}