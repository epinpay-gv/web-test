import UserPageHeader from "@/features/user/components/UserPageHeader";
import RafflesClient from "./raffles-client";
import { getRaffles } from "@/features/user/user.service";

export default async function MyRafflesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const search = await searchParams;
  const res = await getRaffles(search);
  return (
    <div>
      <UserPageHeader title="Çekilişlerim" />
      <RafflesClient
        data={res.data}
        initialFilters={res.filters}
        pagination={res.pagination}
      />
    </div>
  );
}
