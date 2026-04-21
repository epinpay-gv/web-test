import CreateRaffle from "@/features/raffles/components/create-raffle/CreateRaffle";
import UserPageHeader from "@/features/user/components/common/UserPageHeader";

export default function CreateRafflePage() {
  return (
    <div>
      <UserPageHeader title="Yeni Çekiliş Oluştur" />
      <CreateRaffle />
    </div>
  );
}
