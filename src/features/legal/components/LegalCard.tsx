import Link from "next/link";
import { LegalDocument } from "../types";

interface Props {
  document: LegalDocument;
  locale: string;
}

export const LegalCard = ({ document, locale }: Props) => {
  return (
    <Link
      href={`/${locale}/legal/${document.type}`}
      className="bg-(--bg-neutral-primary-soft) "
    >
      <h3 className="text-lg font-semibold mb-2">
        {document.title}
      </h3>
      <p className="text-sm text-muted-foreground">
        {document.description}
      </p>
    </Link>
  );
};
