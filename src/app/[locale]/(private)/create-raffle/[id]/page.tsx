import CreateRaffle from "@/features/raffles/components/create-raffle/CreateRaffle";
import { getRaffleById } from "@/features/user/user.service";
import { mapRaffleToFormData } from "@/features/raffles/utils/raffleMapper";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ 
    id: string; 
    locale: string; 
  }>;
}

export default async function UpdateRafflePage({ params }: PageProps) {
  const { id } = await params;

  let raffleData = null;  
  try {
    const res = await getRaffleById(id);
    raffleData = res.data || res; 
  } catch (error) {
    console.error("Veri çekme hatası:", error);
    return notFound();
  }

  if (!raffleData || !raffleData.title) {
    return notFound();
  }

  const formData = {
    ...mapRaffleToFormData(raffleData),
    id: id 
  };
  
  return (
    <div className="container mx-auto py-8">
      <CreateRaffle key={id} data={formData} editMode={true} />
    </div>
  );
}