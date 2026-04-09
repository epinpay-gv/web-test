import RaffleSuccessPage from "@/features/raffles/components/create-raffle/Result/RaffleSuccessPage";
interface PageProps {
  params: Promise<{ 
    id: string; 
    locale: string; 
  }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;

  return <RaffleSuccessPage raffleId={resolvedParams.id} />;
}