import { Dispatch, SetStateAction } from "react";

export function copyNumber(
  number: string,
  setCopied: Dispatch<SetStateAction<boolean>>,
) {
  navigator.clipboard.writeText(number);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
}
