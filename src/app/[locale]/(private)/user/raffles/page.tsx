import UserPageHeader from "@/features/user/components/common/UserPageHeader";
import RafflesClient from "./raffles-client";
import { getRaffles } from "@/features/user/user.service";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/common";

export default async function MyRafflesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const search = await searchParams;
  const res = await getRaffles(search);
  return (
    <div>
      <RafflesClient
        data={res.data}
        initialFilters={res.filters}
        pagination={res.pagination}
      />
    </div>
  );
}
