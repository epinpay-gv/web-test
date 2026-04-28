import RaffleSuccessPage from "@/features/raffles/components/create-raffle/Result/RaffleSuccessPage";
import RaffleFailedPage from "@/features/raffles/components/create-raffle/Result/RaffleFailedPage";

interface PageProps {
  params: Promise<{ 
    id: string; 
    locale: string; 
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const status = resolvedSearchParams.status;

  if (status === "success") {
    return <RaffleSuccessPage raffleId={resolvedParams.id} />;
  }

  return <RaffleFailedPage />;
}