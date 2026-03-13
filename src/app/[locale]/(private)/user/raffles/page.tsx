import UserPageHeader from "@/features/user/components/UserPageHeader";
import RafflesClient from "./raffles-client";
import { getAllRaffles } from "@/features/raffles/service";

export default async function MyRafflesPage() {
  const res = await getAllRaffles();

  return (
    <div>
      <UserPageHeader title="Çekilişlerim" />
      <RafflesClient data={res.data} initialFilters={res.filters} pagination={res.pagination} />
    </div>
  );
}
