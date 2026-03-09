import { getLegalDocumentByType } from "@/features/legal/service/service";
import { notFound } from "next/navigation";
import { LegalDocumentType } from "@/features/legal/types";


export default async function LegalDetailPage({
    params
}: {
    params: Promise<{ locale: string; document: LegalDocumentType }>;

}) {
    const data = await getLegalDocumentByType((await params).document);

    if (!data) return notFound();

    return (
        <>
     <div className="max-w-5xl mx-auto py-12 px-4">
  <div className="space-y-10 flex flex-col items-center">

    <h1 className="text-xl font-semibold text-center">
      {data.title}
    </h1>

    
                {/* {data.description && (
          <p className="text-muted-foreground">
            {data.description}
          </p>
        )} */}

    {data.blocks.map((block) => (
      <div key={block.id} className="w-full max-w-3xl">
        {block.title && (
          <h2 className="font-semibold py-4 text-(--text-heading)">
            {block.title}
          </h2>
        )}

        <div className="w-full p-6 rounded-xl border border-(--border-default) bg-(--bg-neutral-primary-soft)">
          <p className="text-sm text-(--text-body) leading-relaxed">
            {block.content}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
        {/* <BestSellers hideTimeRanges /> */}
        </>
    );
}
