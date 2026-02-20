import { getLegalDocumentByType } from "@/features/legal/service/service";
import { notFound } from "next/navigation";
import { LegalDocumentType } from "@/features/legal/types";
import BestSellers from "@/features/mainpage/components/bestsellers/BestSellers";
import Section from "@/components/layout/Section/Section";


export default async function LegalDetailPage({
    params
}: {
    params: Promise<{ locale: string; document: LegalDocumentType }>;

}) {
    const data = await getLegalDocumentByType((await params).document);

    if (!data) return notFound();

    return (
        <>
        <div className=" max-w-5xl mx-auto py-12 px-4">
            <div className="space-y-6 ">
                <h1 className="text-xl font-semibold ">
                    {data.title}
                </h1>

                {/* {data.description && (
          <p className="text-muted-foreground">
            {data.description}
          </p>
        )} */}

                {data.blocks.map((block) => (
                    <div key={block.id}>
                        {block.title && (
                            <h2 className="text-(--text-heading) font-semibold py-4">
                                {block.title} 
                            </h2>
                        )}

                        <div className="w-191 h-69.75 p-6 rounded-xl border border-(--border-default) bg-(--bg-neutral-primary-soft)">
                            <p className="text-sm text-(--text-body) leading-relaxed">
                                {block.content}
                            </p>
                        </div>
                    </div>
                ))}

            </div>
        
        </div>
        <Section backgroundClassName="bg-(--bg-brand-softer)">
            <BestSellers hideTimeRanges />

        </Section>
        </>
    );
}
