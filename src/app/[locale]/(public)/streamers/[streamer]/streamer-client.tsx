"use client";
import StatusState from "@/components/common/StatusState/StatusState";
import { Button } from "@/components/common";
import { useRouter } from "next/navigation";

interface StreamerClientPageProps {
  isLoading?: boolean;
}

export default function StreamerClientPage({
  isLoading = false,
}: StreamerClientPageProps) {
  const router = useRouter();
  return (
    <>
      <StatusState
        image="/illustrations/baloon-package-flying-dark.svg"
        title="Bu Sayfa Yapım Aşamasında"
        description="Bu sayfayı tamamlamak için hızla çalışıyoruz. Bir süre sonra tekrar deneyin!"
        actions={
          <Button
            variant="brand"
            text="Ana Sayfaya Git"
            arrows={{ right: true }}
            onClick={() => router.push("/")}
            arrowSize="14"
            className="max-w-33.75 gap-1 text-xs"
            padding="xs"
          />
        }
      />
    </>
  );
}
