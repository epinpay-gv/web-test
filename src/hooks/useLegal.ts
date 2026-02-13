import { getAllLegalDocuments, getLegalDocumentByType } from "@/features/legal/service/service";
import { LegalDocument, LegalDocumentType } from "@/features/legal/types";
import { useEffect, useState } from "react";


export const useLegalList = () => {
  const [data, setData] = useState<LegalDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllLegalDocuments().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return { data, loading };
};

export const useLegalDocument = (type: LegalDocumentType) => {
  const [data, setData] = useState<LegalDocument | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLegalDocumentByType(type).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [type]);

  return { data, loading };
};
