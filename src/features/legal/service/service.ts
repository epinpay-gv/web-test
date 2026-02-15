import { legalMockData } from "@/mocks/legal.mock";
import { LegalDocumentType } from "../types";

export const getAllLegalDocuments = async () => {
  return legalMockData;
};

export const getLegalDocumentByType = async (
  type: LegalDocumentType // service'nin yanlış slug almasını engelliyor.
) => {
  return legalMockData.find((doc) => doc.type === type);
};
