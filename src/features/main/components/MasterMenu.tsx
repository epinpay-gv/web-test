import { useState } from "react";
import MasterMenuLeft from "./MasterMenuLeft";
import MasterMenuRight from "./MasterMenuRight";
import NavigationTabs from "@/components/common/NavLinks/NavTabs/NavigationTabs";
import TimeRangeTabs from "@/components/common/NavLinks/NavTabs/TimeRangeTabs";
import {
  Home,
  AdjustmentsHorizontal,
  UserCircle,
  Download,
  UserHeadset,
} from "flowbite-react-icons/outline";

const MENU_TABS = [
  { label: "Home", value: "home", icon: Home },
  { label: "Settings", value: "settings", icon: AdjustmentsHorizontal },
  { label: "My account", value: "accounts", icon: UserCircle },
  { label: "Downloads", value: "downloads", icon: Download },
  { label: "Supports", value: "supports", icon: UserHeadset },
];

const TIME_RANGES = [
  { label: "Son 24 Saat", value: "24h" },
  { label: "Son 7 Gün", value: "7d" },
  { label: "Son 30 Gün", value: "30d" },
];

export default function MasterMenu() {
  const [activeTab, setActiveTab] = useState("games");
  const [range, setRange] = useState("24h");

  return (
    <div className="h-auto md:h-109 lg:mt-20 md:grid md:grid-cols-2 md:gap-12">
      <div className="hidden md:block">
        <MasterMenuLeft />
      </div>
      <div className="hidden md:block">
        <MasterMenuRight />
      </div>

      <div className="md:hidden">
        <MasterMenuLeft section="top" />
      </div>
      <div className="md:hidden">
        <MasterMenuRight />
      </div>
      <div className="md:hidden">
        <MasterMenuLeft section="bottom" />
      </div>
      <div>
        <NavigationTabs
          items={MENU_TABS}
          activeValue={activeTab}
          onChange={setActiveTab}
          containerClassName="
          flex gap-6
          max-md:flex-col"
          tabClassName="flex items-center gap-2 text-sm px-2 pb-3"
          activeTabClassName="text-(--text-fg-brand)"
          inactiveTabClassName="text-(--text-body)"
          iconClassName="w-3 h-3"
          iconPosition="left"
        />
      </div>
      <div>
        <TimeRangeTabs
          items={TIME_RANGES}
          activeValue={range}
          onChange={setRange}
          containerClassName="inline-flex items-center w-[341px] h-[56px] gap-3 rounded-[16px] bg-(--bg-neutral-primary-soft) p-2"
          tabClassName="flex items-center justify-center text-xs rounded-lg transition"
          activeTabClassName="bg-(--bg-brand) w-[113px] h-[40px] text-black rounded-[12px]"
          inactiveTabClassName="w-[113px] h-[40px] text-(--text-body)" />
      </div>
    </div>
  );
}
