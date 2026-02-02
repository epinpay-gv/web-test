import { useState } from "react";
import MasterMenuLeft from "./MasterMenuLeft";
import MasterMenuRight from "./MasterMenuRight";
// import NavigationTabs from "@/components/common/NavLinks/NavTabs/NavigationTabs";

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

export default function MasterMenu() {
  // const [activeTab, setActiveTab] = useState("");


  return (
    <div className="h-auto md:h-100 lg:mt-15 md:grid md:grid-cols-2 md:gap-12 pb-3">
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
      {/* <div>
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
      </div> */}
    </div>
  );
}
