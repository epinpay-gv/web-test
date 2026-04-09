import CreateRaffle from "@/features/raffles/components/create-raffle/CreateRaffle";
import { getRaffleById } from "@/features/raffles/raffles.service"; 
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
    raffleData = await getRaffleById(id);
  } catch (error) {
    console.error("Veri çekme hatası:", error);
    return <div className="p-10 text-white">Veriler yüklenirken bir hata oluştu.</div>;
  }

  if (!raffleData) {
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