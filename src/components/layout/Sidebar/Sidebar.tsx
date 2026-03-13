import { SidebarItemData } from "./sidebar.types";
import { SidebarItem } from "./components/SidebarItem";
import { UserProfile } from "@/features/user/user.types";

interface SidebarProps {
  data: SidebarItemData[];
  userData: UserProfile;
}
export const Sidebar = ({ data, userData }: SidebarProps) => {
  const initials =
    userData.firstName && userData.lastName ? `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase() : userData.email[0];

  return (
    <aside>
      <div className="flex gap-2 items-center border-b border-(--border-default) pt-2 px-2 pb-5">
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
      {data.map((item) => (
        <SidebarItem key={item.url} data={item} />
      ))}
    </aside>
  );
};
