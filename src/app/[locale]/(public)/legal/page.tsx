import { getAllLegalDocuments } from "@/features/legal/service/service";
import { LegalCard } from "@/features/legal/components/LegalCard";

export default async function LegalPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const documents = await getAllLegalDocuments();

  return (
    <div className=" max-w-5xl mx-auto py-12 px-4">
      <h1 className=" text-2xl font-bold mb-8">
        Yasal Sayfalar
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {documents.map((doc) => (
          <LegalCard
            key={doc.id}
            document={doc}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
}
