"use client";

import { useState } from "react";
import { useTheme } from "next-themes"; // Zustand yerine bunu kullanıyoruz
import { Input } from "@/components/common/Form/Input/Input";
import { User } from "flowbite-react-icons/outline";
import { useEffect } from "react";
import { Checkbox } from "@/components/common/CheckBox/CheckBox";
import NavigationTabs from "@/components/common/NavLinks/NavTabs/NavTabs";
import { Toggle } from "@/components/common/Toggle/Toggle";


import {
  Home,
  AdjustmentsHorizontal,
  UserCircle,
  Download,
  UserHeadset,
  CheckCircle,
} from "flowbite-react-icons/outline";

import NavItems from "@/components/common/NavLinks/NavTabs/NavItems";
import { IconShape } from "@/components/common/IconSahpe/IconShape";
import { Flame, Clock } from "lucide-react";
import Badges from "@/components/common/Badges/Badges";

const TIME_RANGES = [
  { label: "7 Gün", value: "1h" },
  { label: "10Gün", value: "24h" },
  { label: "12Gün", value: "1w" },
];

const MENU_TABS = [
  { label: "Home", value: "home", icon: Home },
  { label: "Settings", value: "settings", icon: AdjustmentsHorizontal },
  { label: "My account", value: "accounts", icon: UserCircle },
  { label: "Downloads", value: "downloads", icon: Download },
  { label: "Supports", value: "supports", icon: UserHeadset },
];

export default function TestPage() {
  const [activeTab, setActiveTab] = useState("");
  const [range, setRange] = useState("");
  const [visible, setVisible] = useState(true);
  return (
    <div className="min-h-screen gap-8 flex justify-center items-center transition-colors bg-white dark:bg-slate-900">
      {/* DİKKAT: bg-white dark:bg-slate-900 kullandığında 
          next-themes temayı değiştirdiğinde Tailwind bunu otomatik yakalar.
      */}
      <div className="flex flex-col gap-10">
        <div className="flex gap-4">
          <div>
            <Checkbox variant="square" />
            <Checkbox variant="square" checked />
          </div>
          <div>
            <Checkbox variant="square" disabled />
            <Checkbox variant="square" disabled checked />
          </div>
        </div>
        <div className="flex gap-4">
          <div>
            <Checkbox variant="circle" />
            <Checkbox variant="circle" checked />
          </div>
          <div>
            <Checkbox variant="circle" disabled />
            <Checkbox variant="circle" disabled checked />
          </div>
        </div>
        <div className="flex gap-10">
          <Checkbox
            variant="square"
            label="Remember me"
          />
          <Checkbox
            variant="square"
            label="Remember me"
            helperText="Save my credentials for easier sign-in"
          />

          <div className="p-10 space-y-6">
            {/* Normal */}
            <div className="flex gap-2">
              <Toggle />          
              <Toggle checked />
            </div>
            {/* Disabled */}
            <div className="flex gap-2">
              <Toggle disabled />
              <Toggle disabled checked />
            </div>
             {/* Normal */}
            <div className="flex gap-2">
              <Toggle size="lg"/>          
              <Toggle checked size="lg"/>
            </div>
            {/* Disabled */}
            <div className="flex gap-2">
              <Toggle disabled size="lg"/>
              <Toggle disabled checked size="lg"/>
            </div>
            
            {/* Focus halini görmek için Tab tuşuna basabilirsin */}
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-slate-800/60 px-4 py-3">
            <Checkbox
              variant="square"
              label="Remember me"
              helperText="Save my credentials for easier sign-in"
            />
          </div>
          <div className="p-10 flex gap-4 items-center">
            {/* Statik Renk - Circle */}
            <IconShape icon={Flame} color="green" variant="circle" size="lg" />
            
            {/* Statik Renk - Square */}
            <IconShape icon={Flame} color="red" variant="square" size="lg" onClick={() => alert("ikona tıklandı")}/>
            
            {/* Dışarıdan Özel Renk (Custom) */}
            <IconShape 
              icon={Flame} 
              color="custom" 
              customColor="var(--text-heading)" 
              variant="square" 
              size="lg" 
            />
          </div>
          <div>

            <NavItems
              label="Item 1"
              value="item1"
              icon={AdjustmentsHorizontal}
              isActive={false}
              onClick={() => { }}
              variant="bordered"
              size="base"
              iconPosition="left"
            />

            <NavigationTabs
              items={MENU_TABS}
              activeValue={activeTab}
              onChange={setActiveTab}
              variant="bordered"
              size="base"
            />

          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Badges text="new" theme="gray" secondaryText="secondary text" closable icon={<Clock />} type="default" />

        {visible && (
          <Badges
            text="Closable badge"
            theme="danger"
            icon={<Clock />}
            size="lg"
            closable
            secondaryText="secondary text"
            onClose={() => setVisible(false)}
          />
        )}

      </div>
    </div>
  );
}