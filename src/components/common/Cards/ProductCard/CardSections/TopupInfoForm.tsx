"use client";

import { Input } from "@/components/common/Form";

interface TopupInfoFormProps {
  isLoading?: boolean;
}

export function TopupInfoForm({
  isLoading = false,
}: TopupInfoFormProps) {
 
  return (
    <div>
        <Input/>
      
    </div>
  );
}
