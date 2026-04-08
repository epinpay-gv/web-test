export type PhoneCode = {
  label: string;
  value: string;
  country: string;
};

export const PHONE_CODES: PhoneCode[] = [
  { label: "+90", value: "+90", country: "TR" },
  { label: "+1",  value: "+1",  country: "US" },
  { label: "+44", value: "+44", country: "GB" },
  { label: "+49", value: "+49", country: "DE" },
  { label: "+33", value: "+33", country: "FR" },
];