import { SidebarItemData } from "./sidebar.types";
import { SidebarItem } from "./components/SidebarItem";
import { UserProfile } from "@/features/user/user.types";
import { Button } from "@/components/common";

interface SidebarProps {
  data: SidebarItemData[];
  secondaryData: SidebarItemData[];
  userData: UserProfile;
}
export const Sidebar = ({ data, secondaryData, userData }: SidebarProps) => {
  const initials =
    userData.firstName && userData.lastName
      ? `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase()
      : userData.email[0];

  return (
    <aside className="p-5 space-y-4 hidden w-77 rounded-2xl bg-(--bg-neutral-primary-soft) lg:block">
      {/* USER INFO */}
      <div className="flex gap-2 items-center border-b border-(--border-default) pb-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-(--bg-quaternary-medium) text-(--text-body) font-semibold text-sm">
          {initials}
        </div>

        <div className="flex flex-col gap-0">
          {userData.firstName && userData.lastName && (
            <div>
              {userData.firstName} {userData.lastName}
            </div>
          )}

          <div className="text-(--text-body)">{userData.email}</div>
        </div>
      </div>

      {/* LINKS */}
      <div>
        {data.map((item) => (
          <SidebarItem key={item.url} data={item} />
        ))}

        <div className="my-2 border-b border-(--border-default)" />

        {secondaryData.map((item) => (
          <SidebarItem key={item.url} data={item} />
        ))}
      </div>

      {/* INFO PART */}
      <div className="p-4 space-y-4 bg-(--bg-brand-softer) border border-(--border-brand-subtle) rounded-lg">
        <div className="space-y-2">
          <p className="text-(--text-fg-brand-strong) leading-4 font-medium">
            Davet Et Kazan!
          </p>
          <p className="text-(--text-fg-brand-strong) leading-[150%] text-sm">
            Her alışveriş yaptıklarında siz de Epinpay’in{" "}
            <span className="text-(--text-fg-yellow)">net kârının %25’i </span>
             oranında komisyon alırsınız.
          </p>
        </div>
        <Button variant="brand" text="Hemen Kazanmaya Başla" size="xs" className="w-full"/>
      </div>
    </aside>
  );
};
